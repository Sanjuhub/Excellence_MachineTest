const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  emailId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Candidate", candidateSchema);
