const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
        || request.get('Authorization')
        || request.headers.authorization

    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7).trim()
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if(request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        request.user = await User.findById(decodedToken.id)
    }
    next()
}

module.exports = { tokenExtractor, userExtractor }