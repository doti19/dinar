const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const {
  playerOne,
  playerTwo,
  courtSurface,
  note,
  date,
  playerStatus,
  playerOneScoreMessages,
  playerTwoScoreMessages,
  typeMessages,
  setsMessages,
  p1TotalScoreMessages,
  p2TotalScoreMessages,
  gamesMessages,
  serverMessages,
  winnerMessages,
  scoresMessages,
  gameNumberMessages,
} = require("../messags/match.messages");

const playerOneField = Joi.objectId()
  .required()
  .messages(playerOne)
  .label("PlayerOne");

const playerTwoField = Joi.objectId()
  .required()
  .messages(playerTwo)
  .label("PlayerTwo");

const indoorField = Joi.boolean().label("Indoor"); 
const courtSurfaceField = Joi.string()
  .required()
  .valid("clay", "hard", "carpet", "grass", "other")
  .messages(courtSurface)
  .label("CourtSurface");

const noteField = Joi.string()
  .optional()
  .empty("")
  .messages(note)
  .label("Note");

const dateField = Joi.date().required().messages(date).label("Date");

const playerStatusField = Joi.string()
  .required()
  .valid("accepted", "rejected")
  .messages(playerStatus)
  .label("PlayerStatus");

const playerOneScoreField = Joi.string()
  .required()
  .messages(playerOneScoreMessages)
  .label("PlayerOneScore");

const playerTwoScoreField = Joi.string()
  .required()
  .messages(playerTwoScoreMessages)
  .label("PlayerTwoScore");

const typeField = Joi.string()
  .valid(
    "ace",
    "fault",
    "p1Winner",
    "p2Winner",

    "p1UnforcedError",
    "p2UnforcedError",
    "p1ForcedError",
    "p2ForcedError",
    "doubleFault",
    "returnWinner",
    "returnError"
  )
  .required()
  .messages(typeMessages)
  .label("Type");

const scoreSchema = Joi.object().keys({
  p1Score: playerOneScoreField,
  p2Score: playerTwoScoreField,
  isSecondService: Joi.boolean().required(),
  type: typeField,
});

const scoresField = Joi.array().items(scoreSchema);

const gameNumberField = Joi.number()
  .integer()
  .required()
  .messages(gameNumberMessages)
  .label("GameNumber");

const winnerField = Joi.string()
  .valid("playerOne", "playerTwo")
  .required()
  .messages(winnerMessages)
  .label("Winner");

const serverField = Joi.string()
  .valid("playerOne", "playerTwo")
  .required()
  .messages(serverMessages)
  .label("Server");

const gamesField = Joi.array()
  .items(
    Joi.object().keys({
      gameNumber: gameNumberField,
      scores: scoresField,
      // winner: winnerField,
      server: serverField,
    })
  )
  .required()
  .messages(gamesMessages)
  .label("Games");

const p1TotalScoreField = Joi.number()
  .integer()
  .required()
  .messages(p1TotalScoreMessages)
  .label("PlayerOneTotalScore");

const p2TotalScoreField = Joi.number()
  .integer()
  .required()
  .messages(p2TotalScoreMessages)
  .label("PlayerTwoTotalScore");



const setsField = Joi.array()
  .items(
    Joi.object().keys({
      p1TotalScore: p1TotalScoreField,
      p2TotalScore: p2TotalScoreField,
    //   winner: winnerField,
      games: gamesField,
    })
  )
  .required()
  .messages(setsMessages)
  .label("Sets");

module.exports = {
  playerOneField,
  playerTwoField,
  courtSurfaceField,
  indoorField,
  noteField,
  dateField,
  playerStatusField,
  playerOneScoreField,
  playerTwoScoreField,
  typeField,
  scoreSchema,
  scoresField,
  gameNumberField,
  winnerField,
  serverField,
  gamesField,
  p1TotalScoreField,
  p2TotalScoreField,
  setsField,
};
