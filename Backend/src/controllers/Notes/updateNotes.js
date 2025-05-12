import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function updateNotes(request, response) {
    try {
        const note_id = request.params.note_id;
        const text = request.body.text;
        const getGroupNotesQry = `update notes set text=? where note_id=?`;

        connection.query(getGroupNotesQry,[text,note_id], (error, result) => {
            if (!error) {
                response
                    .status(StatusCodes.OK)
                    .send({ message: "Successfully Updated Notes" });
            } else {
                console.log(error)
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send({ message: "Error Updating notes" });
            }
        })
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });

    }
}