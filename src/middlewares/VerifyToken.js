import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
const publicKey = fs.readFileSync('src/keys/PublicKey.pem')


export function verifyToken(request, response, next) {

    const AuthHeader = request.get('Authorization');

    if (AuthHeader) {
        const token = AuthHeader.split(" ")[1];
        jwt.verify(token, publicKey, (error, payload) => {
            if (!error) {
                next();
            } else {
                response
                    .status(StatusCodes.UNAUTHORIZED)
                    .send({ message: "Token is invalid" })

            }
        })
    }
    else {
        response
        .status(StatusCodes.UNAUTHORIZED)
        .send({message:"Token is missing"})
    }

}