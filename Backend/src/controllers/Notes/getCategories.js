import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function getCategories(request,response){
    try {
            
            const getGroupNotesQry = 'select category_id,category_name from categories';
    
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