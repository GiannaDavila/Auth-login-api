import jwt from 'jsonwebtoken'
import { secretKey } from '../secrets.js'

export function isUserReallyUser (req,res,next){
    const token = req.headers.authorization 
    //verify and decode
    const decodedToken = jwt.verify(token, secretKey)
    //check that the uid there requesting to patch is the one in there token
    const requestedUid = req.params.uid
    if(decodedToken.uid !== requestedUid){
        res.status(401).send({ message: 'Not authorized'})
        return
    }
    //all is good come on in
    req.decoded = decodedToken
    next()
}