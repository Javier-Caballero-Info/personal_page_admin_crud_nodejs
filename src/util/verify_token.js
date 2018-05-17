
import jwt from 'jsonwebtoken'
import config from '../config'

function verifyToken(req, res, next) {

    if (! req.headers['authorization']) {
        return res.status(403).send({ auth: false, message: 'No token provided.' })
    }

    const completeToken = req.headers['authorization'].split(' ');

    const token = completeToken[1]

    if (completeToken[0] !== 'BEARER' || !token){
        return res.status(403).send({ auth: false, message: 'No token provided.' })
    }
    jwt.verify(token, config.get('secret'), { algorithms: ['HS384'] }, function(err, decoded) {
        if (err) {
            return res.status(403).send({auth: false, message: 'Failed to authenticate token.'});
        }
        // if everything good, save to request for use in other routes
        req.userId = decoded['usid'];
        next();
    });
}

export default verifyToken;
