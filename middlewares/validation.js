const { check, validationResult } = require("express-validator");
const candidateModel = require("../models/cadidateModel");

exports.validateCadidate = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!"),

  check("emailId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email not valid"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateScore = [
  check("first_test")
    .not()
    .isEmpty()
    .withMessage("First test score required.")
    .bail()
    .isNumeric()
    .withMessage("Score must be numeric.")
    .bail()
    .isInt({ min: 0, max: 10 })
    .withMessage("Score must be in range 0 and 10")
    .bail(),

  check("second_test")
    .not()
    .isEmpty()
    .withMessage("Second test score required.")
    .bail()
    .isNumeric()
    .withMessage("Score must be numeric.")
    .bail()
    .isInt({ min: 0, max: 10 })
    .withMessage("Score must be in range 0 and 10")
    .bail(),

  check("third_test")
    .not()
    .isEmpty()
    .withMessage("Third test score required.")
    .bail()
    .isNumeric()
    .withMessage("Score must be numeric.")
    .bail()
    .isInt({ min: 0, max: 10 })
    .withMessage("Score must be in range 0 and 10")
    .bail(),

  check("candidateId")
    .not()
    .isEmpty()
    .withMessage("CandidateId required.")
    .bail()
    .isMongoId()
    .custom((value, { req, loc, path }) => {
      return candidateModel.findById(req.body.candidateId).then((user) => {
        if (!user) {
          return Promise.reject("Candidate does not exist");
        }
      });
    })
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
