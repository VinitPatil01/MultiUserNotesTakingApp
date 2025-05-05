import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { compareSync} from "bcrypt";
import { connection } from '../../index.js';
import fs from 'fs';

const privateKey = fs.readFileSync('src/keys/PrivateKey.pem');

export function LoginStudent(request, response) {
    try {
        const data = request.body;
        const qry = `select username,password from user where username='${data.username}'`;

        connection.query(qry, (error, result) => {
            if (!error) {
                console.log(result);
                if (compareSync(data.password, result[0].password)) {

                    const token = jwt.sign({ prn: result[0].prn }, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
                    response.status(StatusCodes.OK).send({ message: 'Login successful', token: token });
                } else {
                    console.log(error);
                    response.status(StatusCodes.BAD_REQUEST).send({ message: 'Username or Password is invalid' });
                }
            } else {
                console.log(error);
                response.status(StatusCodes.BAD_REQUEST).send({ message: 'Username or Password is invalid' });
            }
        })
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }

}