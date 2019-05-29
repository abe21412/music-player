const express = require("express");
const router = express.Router();
const {
  uploadTrack,
  streamTrack,
  getAllTracks,
  deleteTrack
} = require("../controllers/tracks");

router.post("/", uploadTrack);

router.get("/all", getAllTracks);

router
  .route("/:trackid")
  .get(streamTrack)
  .delete(deleteTrack);

module.exports = router;
