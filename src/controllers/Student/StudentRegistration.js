import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";
import { hashSync } from "bcrypt";


export function RegisterStudent(request, response) {
    try {
        const data = request.body;
        const encPasswd = hashSync(data.password,10)
        const qry = `insert into student(prn,first_name,last_name,email,username,password,mobile_number,gender,course,center) values ('${data.prn}','${data.first_name}','${data.last_name}','${data.email}','${data.username}','${encPasswd}','${data.mobile_number}','${data.gender}','${data.course}','${data.center}')`;
        
        connection.query(qry,(error,result)=>{
            if (!error) {
                response
                .status(StatusCodes.CREATED)
                .send({message:"Student Registered Successfully"});
            } else {
                console.log(error)
                if(error.errno==1062){
                    response
                    .status(StatusCodes.BAD_REQUEST)
                    .send({message:"Duplicates not allowed"})
                }else{
                    console.log(error);
                    response
                    .status(StatusCodes.BAD_REQUEST)    
                    .send({message:"Error Inserting Data"})
                }
            }
        })


    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}