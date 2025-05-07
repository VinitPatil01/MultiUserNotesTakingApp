import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
const publicKey = fs.readFileSync('src/keys/PublicKey.pem')


export function verifyToken(request, response, next) {
  const authHeader = request.get('Authorization');
  if (!authHeader) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Token is missing" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (error, payload) => { // skdjarpbuiwj0 vinit 
    if (!error) {
      request.user = payload;
      next();
    }
    else {
      console.log(error);
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Token is invalid" });
    }
  });
}
