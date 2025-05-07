import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { compareSync } from "bcrypt";
import { connection } from '../../../index.js';
import fs from 'fs';

const privateKey = fs.readFileSync('src/keys/PrivateKey.pem');

export function LoginStudent(request, response) {
    try {
        const data = request.body;
        const qry = `select username,password from student where username='${data.username}'`;
        connection.query(qry, (error, result) => {
            if (result.length != 0) {
                if (!error) {
                    console.log(result)
                    if (compareSync(data.password, result[0].password)) {
                        const token = jwt.sign(
                            { username: result[0].username }, 
                            privateKey,
                            {algorithm:"RS256",expiresIn:'5h'}
                        );
                        response
                            .status(StatusCodes.OK)
                            .send({ message: 'Login successful', token: token });
                    } else {
                        console.log(error);
                        response
                            .status(StatusCodes.BAD_REQUEST)
                            .send({ message: 'Username or Password is invalid' });
                    }
                }
                else {
                    console.log(error);
                    response
                        .status(StatusCodes.BAD_REQUEST)
                        .send({ message: 'Username or Password is invalid' });
                }
            }

            else {
                response
                .status(StatusCodes.NOT_FOUND)
                .send({message:"User Not found"})
            }
        })
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }

}