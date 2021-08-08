const candidateModel = require("../models/cadidateModel");
const testScoreModel = require("../models/testScoreModel");
const mongoose = require("mongoose");

async function addCandidate(req, res, next) {
  const name = req.body.name;
  const emailId = req.body.emailId;

  const existingCadidate = await candidateModel.findOne({ name, emailId });

  if (existingCadidate) {
    return res.json("Candidate already exists.");
  }

  const newCandidate = new candidateModel({
    name,
    emailId,
  });

  newCandidate.save((err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.status(201).json(data);
  });
}

async function addScore(req, res) {
  const candidateId = req.body.candidateId;
  const firstScore = req.body.first_test;
  const secondScore = req.body.second_test;
  const thirdScore = req.body.third_test;

  const findDup = await testScoreModel.findOne({
    candidateId: { _id: candidateId },
  });

  if (findDup) {
    return res.json("Score added already");
  }

  const newScore = new testScoreModel({
    firstRound: firstScore,
    secondRound: secondScore,
    thirdRound: thirdScore,
    candidateId: candidateId,
  });

  newScore.save((err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log(data);
      return res.status(201).json(data);
    }
  });
}

function highestScore(req, res) {
  testScoreModel
    .aggregate([
      {
        $lookup: {
          from: "candidates",
          localField: "candidateId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $group: {
          _id: {
            candidateName: "$result.name",
          },
          total: {
            $sum: {
              $add: ["$firstRound", "$secondRound", "$thirdRound"],
            },
          },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 1 },
    ])
    .then((err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
}

function averageScore(req, res) {
  testScoreModel
    .aggregate([
      {
        $group: {
          _id: null,
          firstRoundAverage: { $avg: "$firstRound" },
          secondRoundAverage: { $avg: "$secondRound" },
          thirdRoundAverage: { $avg: "$thirdRound" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ])
    .then((err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
}

module.exports = {
  addCandidate,
  addScore,
  highestScore,
  averageScore
};
