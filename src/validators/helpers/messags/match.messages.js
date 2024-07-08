
const playerOne = {
    'string.empty': 'PlayerOne cannot be empty',
    'any.required': 'PlayerOne is required',
    'string.base': 'PlayerOne must be a string',
}
const playerTwo = {
    'string.empty': 'PlayerTwo cannot be empty',
    'any.required': 'PlayerTwo is required',
    'string.base': 'PlayerTwo must be a string',
}

const courtSurface = {
    'string.empty': 'CourtSurface cannot be empty',
    'any.required': 'CourtSurface is required',
    'string.base': 'CourtSurface must be a string',
    'string.enum': 'CourtSurface must be one of the following: clay, hard, carpet, grass, beach, other',
    'string.valid': 'CourtSurface must be one of the following: clay, hard, carpet, grass, beach, other',

}

const note = {
    'string.empty': 'Note cannot be empty',
    'any.required': 'Note is required',
    'string.base': 'Note must be a string',
}

const date = {
    'any.required': 'Date is required',
    'date.base': 'Date must be a valid date',
}

const playerStatus = {
    'string.empty': 'PlayerStatus cannot be empty',
    'any.required': 'PlayerStatus is required',
    'string.base': 'PlayerStatus must be a string',
    'string.enum': 'PlayerStatus must be one of the following: accepted, rejected',
    'string.valid': 'PlayerStatus must be one of the following: accepted, rejected',

}

const gameNumberMessages = {
    'number.empty': 'GameNumber cannot be empty',
    'any.required': 'GameNumber is required',
    'number.base': 'GameNumber must be a number',
    'number.integer': 'GameNumber must be an integer',
    'number.positive': 'GameNumber must be a positive number',
}

const playerOneScoreMessages = {
    'number.empty': 'PlayerOneScore cannot be empty',
        'any.required': 'PlayerOneScore is required',
        'number.base': 'PlayerOneScore must be a number',
        'number.integer': 'PlayerOneScore must be an integer',
        'number.positive': 'PlayerOneScore must be a positive number',
}

const playerTwoScoreMessages = {
    'number.empty': 'PlayerTwoScore cannot be empty',
        'any.required': 'PlayerTwoScore is required',
        'number.base': 'PlayerTwoScore must be a number',
        'number.integer': 'PlayerTwoScore must be an integer',
        'number.positive': 'PlayerTwoScore must be a positive number',
}

const typeMessages = {
    'string.empty': 'Type cannot be empty',
        'any.required': 'Type is required',
        'string.base': 'Type must be a string',
        'string.enum': 'Type must be one of the following: ace, fault, winner, unforcedError, forcedError, doubleFault, returnWinner, returnError',
        'string.valid': 'Type must be one of the following: ace, fault, winner, unforcedError, forcedError, doubleFault, returnWinner, returnError',
}

const scoresMessages = {
    'array.empty': 'Scores cannot be empty',
    'any.required': 'Scores is required',
    'array.base': 'Scores must be an array',
    'array.includes': 'Scores must include the following fields: playerOneScore, playerTwoScore, type',
    'array.includes.playerOneScore': 'Scores must include playerOneScore',
    'array.includes.playerTwoScore': 'Scores must include playerTwoScore',
    'array.includes.type': 'Scores must include type',
    // 'array.items.number.base': 'Scores must be an array of numbers',
    // 'array.items.number.empty': 'Scores cannot be empty',
    // 'array.items.number.required': 'Scores is required',
    // 'array.items.number.positive': 'Scores must be a positive number',
    // 'array.items.number.integer': 'Scores must be an integer',
    'array.items.object.base': 'Scores must be an array of objects',
    'array.items.object.keys': 'Scores must include the following fields: playerOneScore, playerTwoScore, type',
    // playerOneScore: playerOneScoreMessages,
    // playerTwoScore: playerTwoScoreMessages,
    // type: typeMessages,

}

const winnerMessages = {
    'string.empty': 'Winner cannot be empty',
    'any.required': 'Winner is required',
    'string.base': 'Winner must be a string',
    'string.enum': 'Winner must be one of the following: playerOne, playerTwo',
    'string.valid': 'Winner must be one of the following: playerOne, playerTwo',
}

const serverMessages = {
    'string.empty': 'Server cannot be empty',
    'any.required': 'Server is required',
    'string.base': 'Server must be a string',
    'string.enum': 'Server must be one of the following: playerOne, playerTwo',
    'string.valid': 'Server must be one of the following: playerOne, playerTwo',
}


const gamesMessages={
    'array.empty': 'Games cannot be empty',
    'any.required': 'Games is required',
    'array.base': 'Games must be an array',
    'array.unique': 'Games must be unique',
    'array.includes': 'Games must include the following fields: gameNumber, scores, winner, server',
    'array.includes.gameNumber': 'Games must include gameNumber',
    'array.includes.scores': 'Games must include scores',
    // 'array.includes.winner': 'Games must include winner',
    'array.includes.server': 'Games must include server',
    'array.items.object.base': 'Games must be an array of objects',
    'array.items.object.keys': 'Games must include the following fields: gameNumber, scores, winner, server',
    // gameNumber: gameNumberMessages,
    // scores: scoresMessages,
    // // winner: winnerMessages,
    // server: serverMessages,
}

const p1TotalScoreMessages = {
    'number.empty': 'P1TotalScore cannot be empty',
    'any.required': 'P1TotalScore is required',
    'number.base': 'P1TotalScore must be a number',
    'number.integer': 'P1TotalScore must be an integer',
    'number.positive': 'P1TotalScore must be a positive number',
}

const p2TotalScoreMessages = {
    'number.empty': 'P2TotalScore cannot be empty',
    'any.required': 'P2TotalScore is required',
    'number.base': 'P2TotalScore must be a number',
    'number.integer': 'P2TotalScore must be an integer',
    'number.positive': 'P2TotalScore must be a positive number',
}

const setsMessages = {
    'array.empty': 'Sets cannot be empty',
    'any.required': 'Sets is required',
    'array.base': 'Sets must be an array',
    'array.unique': 'Sets must be unique',
    'array.includes': 'Sets must include the following fields: p1TotalScore, p2TotalScore, winner, games',
    'array.includes.p1TotalScore': 'Sets must include p1TotalScore',
    'array.includes.p2TotalScore': 'Sets must include p2TotalScore',
    'array.includes.winner': 'Sets must include winner',
    'array.includes.games': 'Sets must include games',
    'array.items.object.base': 'Sets must be an array of objects',
    'array.items.object.keys': 'Sets must include the following fields: p1TotalScore, p2TotalScore, winner, games',
    // p1TotalScore: p1TotalScoreMessages,
    // p2TotalScore: p2TotalScoreMessages,
    // // winner: winnerMessages,
    // games: gamesMessages,
}


module.exports = {
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
    gameNumberMessages
}
