import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function deleteNotes(request, response) {
    try {
        const note_id = request.params.note_id;
        const getGroupNotesQry = `delete from notes where note_id=${note_id}`;

        connection.query(getGroupNotesQry, (error, result) => {
            if (!error) {
                response.status(StatusCodes.OK).send({message:"Successfully Deleted Notes"})
            } else {
                console.log(error)
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send({ message: "Error Deleting Notes" });
            }
        })
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });

    }
}