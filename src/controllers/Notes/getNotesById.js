import { StatusCodes } from "http-status-codes";
import { connection } from "../../../index.js";


export function getNotesById(request, response) {
    try {
        const note_id = request.params.note_id;
        const getGroupNotesQry = `SELECT N.note_id, N.title, N.type, N.text, N.pdf_url, S.first_name, 
                                N.created_at, C.category_name 
                                FROM student S, notes N, categories C 
                                WHERE N.created_by = S.prn 
                                AND C.category_id = N.category_id 
                                AND N.note_id = ${note_id}`;

        connection.query(getGroupNotesQry, (error, result) => {
            if (!error) {
                if (result.length !== 0) {
                    
                    const note = result[0];
                    var fullPdfUrl = null;

                    if (note.type=='pdf' && note.pdf_url) {
                        fullPdfUrl = `${request.protocol}://${request.get('host')}/pdfs/${note.pdf_url}`;
                        note.pdf_url=fullPdfUrl;
                    }
                    
                    response
                    .status(StatusCodes.OK)
                    .send(note);
                    
                } else {
                    response
                        .status(StatusCodes.NOT_FOUND)
                        .send({ message: "Note not found" });
                }
            } else {
                console.log(error);
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send({ message: "Error retrieving note" });
            }
        });
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}