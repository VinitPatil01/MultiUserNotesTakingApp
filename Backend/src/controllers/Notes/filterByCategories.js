import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function filterByCategories(request,response){
     try {
                const category_id = request.body.category_id;
                const username = request.user.username;
                const getGroupNotesQry = `select N.note_id,N.title,N.type,N.pdf_url,S.first_name as Created_by,N.created_at,C.category_name from student S,categories C, notes N where S.prn=N.created_by and N.category_id=C.category_id and C.category_id=${category_id} and S.username='${username}';`;
        
                connection.query(getGroupNotesQry, (error, result) => {
                    if (!error) {
                        if (result.length != 0) {
                            response
                                .status(StatusCodes.OK)
                                .send(result);
                        } else {
                            response
                                .status(StatusCodes.NOT_FOUND)
                                .send({message:"No result Found"});
                        }
                    } else {
                        console.log(error)
                        response
                                .status(StatusCodes.BAD_REQUEST)
                                .send({message:"No result Found"});
                    }
                })
            } catch (error) {
                console.log(error);
                response
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .send({ message: "Something went wrong" });
        
            }
    }
