import { StatusCodes } from "http-status-codes";
import {connection} from '../../../index.js'

export function updateNotes(request, response) {
    try {

        const Id = request.params.note_id
        const BodyText = request.body.text
        const updateQuery = `update notes set text='${BodyText}' where note_id=${Id}`

        connection.query(updateQuery, (error, result) => {
            if (!error) {
                response
                    .status(StatusCodes.OK)
                    .send({ message: "Notes Updated Successfully" });

            } else {
                console.log(error)
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .send({ message: "Error while updating notes" });
            }
        })
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });

    }
}