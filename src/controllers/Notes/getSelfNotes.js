import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function getSelfNotes(reqeust,response){
    try {
        const reqUsername = reqeust.user.username;
        const getSelfNotesQry = `select N.title,N.type,N.text,N.pdf_url,S.first_name,N.created_at,C.category_name from student S, notes N,categories C where N.created_by=S.prn and C.category_id=N.category_id and S.username='${reqUsername}'`;
        connection.query(getSelfNotesQry ,(error,result)=>{
            if (!error) {
                response
                .status(StatusCodes.OK)
                .send(result)
            } else {
                response
                .status(StatusCodes.BAD_REQUEST)
                .send({message:"Error while fetcing notes"})
            }
        })
    } catch (error) {
        console.log(error);
        response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({message:"Something went wrong"})
    }
}