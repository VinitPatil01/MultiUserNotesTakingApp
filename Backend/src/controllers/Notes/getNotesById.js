import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function getNotesById(request, response) {
    try {
        const note_id = request.params.note_id;
        const getGroupNotesQry = `select N.note_id, N.title, N.type, N.text, N.pdf_url, S.first_name,N.created_at,C.category_name from student S , notes N, categories C where N.created_by=S.prn and C.category_id=N.category_id and N.note_id=${note_id}`;

        connection.query(getGroupNotesQry, (error, result) => {
            if (!error) {
                if (result.length != 0) {
                    response
                        .status(StatusCodes.OK)
                        .send(result);
                } else {
                    response
                        .status(StatusCodes.NOT_FOUND)
                        .send({ message: "No result Found" });
                }
            } else {
                console.log(error)
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send({ message: "No result Found" });
            }
        })
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });

    }
}