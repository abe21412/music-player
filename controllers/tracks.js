//import dependencies
const mongoose = require("mongoose");
const multer = require("multer");
const { Readable } = require("stream");
const ObjectID = require("mongodb").ObjectID;
const User = require("../models/User");

//configure mongodb connection
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("successfully connected"))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

//mongoose.connection object holds data necessary to set up the gridfs bucket
const db = mongoose.connection;
/*the gridfs bucket constructor needs info from the 's' property of the db object 
but in this version of mongoose, the necessary information is in the db.client object
so we have to add a new property to the base db object with db.s and set it equal to db.client.s */
db.s = db.client.s;
const driver = mongoose.mongo;
let bucket = new driver.GridFSBucket(db, {
  bucketName: "tracks"
});

const uploadTrack = (req, res) => {
  //configure storage object for multer
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fields: 4, fileSize: 6000000 }
  });
  upload.single("track")(req, res, err => {
    if (err) {
      return res.status(400).json({ err });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }

    let trackName = req.body.name;
    let artist = req.body.artist;
    let album = req.body.album;

    // Covert buffer to Readable Stream
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    let uploadStream = bucket.openUploadStream(trackName);
    let trackId = new ObjectID(uploadStream.id);

    /*when the read stream's data event fires off, the function will take the chunk
      and write ot to the upload stream*/
    readableStream.on("data", chunk => {
      uploadStream.write(chunk, err => {
        if (err) return res.status(400).json({ err });
      });
    });
    //call the upload stream's end method when the read stream's end event is detected
    readableStream.on("end", () => {
      uploadStream.end(() => console.log("done"));
      //push the newly uploaded track to the user's db entry
      User.findOneAndUpdate(
        { email: res.locals.email },
        {
          $push: {
            tracks: {
              trackId,
              name: trackName,
              artist: artist || null,
              album: album || null
            }
          }
        },
        { useFindAndModify: false },

        () => {
          res
            .status(200)
            .json({ msg: "File successfully uploaded", fileId: trackId });
        }
      );
    });
  });
};

const streamTrack = async (req, res) => {
  //get track id from req params, check if exists, and begin download stream
  try {
    var trackId = new ObjectID(req.params.trackid);
  } catch (err) {
    return res.status(401).json({ err: `${err}` });
  }
  const exists = await db.collection("tracks.files").findOne({ _id: trackId });
  if (!exists) return res.status(404).json({ err: "track not found" });

  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  //write chunks to res until end event is detected
  let download = bucket.openDownloadStream(trackId);
  download.on("data", chunk => {
    res.write(chunk);
  });

  download.on("error", err => {
    res.status(400).json({ err });
  });

  download.on("end", () => {
    res.end();
  });
};

const getAllTracks = async (req, res) => {
  //get all tracks for every user, push into one array, and return response
  let results = await User.find({}).select("tracks");
  let tracks = [];
  if (!results) return res.status(404).json({ err: "no tracks found" });
  for (result of results) {
    tracks.push(...result.tracks);
  }
  return res.status(200).json(tracks);
};

//delete track based on track id from req params
const deleteTrack = async (req, res) => {
  let user = res.locals;
  let trackId = new ObjectID(req.params.trackid);
  User.findOneAndUpdate(
    { email: user.email },
    { $pull: { tracks: { trackId } } },
    { useFindAndModify: false },
    () => res.status(200).json({ msg: "track successfully deleted" })
  );
};

module.exports = {
  uploadTrack,
  streamTrack,
  getAllTracks,
  deleteTrack
};
