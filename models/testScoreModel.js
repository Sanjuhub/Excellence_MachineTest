const mongoose = require("mongoose");

const testScoreSchema = mongoose.Schema({
  firstRound: { type: Number, required: true },
  secondRound: { type: Number, required: true },
  thirdRound: { type: Number, required: true },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
});

module.exports = mongoose.model("TestScore", testScoreSchema);
