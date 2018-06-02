
import jwt from 'jsonwebtoken'
import config from '../config'

function verifyToken(req, res, next) {

    if (! req.headers['authorization']) {
        return res.status(403).send({ auth: false, message: 'No token provided.' })
    }

    const completeToken = req.headers['authorization'].split(' ')

    const token = completeToken[1]

    if (completeToken[0] !== 'Bearer' || !token){
        return res.status(403).send({ auth: false, message: 'No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, config.get('secret'), { algorithms: ['HS384'] })
        // if everything good, save to request for use in other routes
        req.userId = decoded['identity']
        next()
    } catch(err) {
        if( err.name === 'TokenExpiredError' ){
            return res.status(403).send({error: 'E0102', message: 'Jwt token expired'})
        } else {
            return res.status(403).send({error: 'E0101', message: 'Failed to authenticate token.'})
        }

    }

}

export default verifyToken;
