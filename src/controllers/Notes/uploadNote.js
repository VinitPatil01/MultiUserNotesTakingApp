import { StatusCodes } from "http-status-codes";
import path from 'path';
import fs from 'fs';
import { connection } from "../../../index.js";

export function uploadNotes(request, response) {
    try {
        const {title, type, text, created_by} = request.body;
        const file = request.file;

        const columns = ['title', 'type', 'text', 'created_by', 'created_at'];
        const values = [title, type, text, created_by, new Date()];
        const parameters = ['?', '?', '?', '?', '?'];

        if (file) {
            const customDir = path.join('uploads', created_by);
            if (!fs.existsSync(customDir)) {
                fs.mkdirSync(customDir, { recursive: true });
            }
            const finalPath = path.join(customDir, file.originalname);
            fs.renameSync(file.path, finalPath);

            const pdfUrl = finalPath.replace(/\\/g, '/');
            columns.push('pdf_url');
            values.push(pdfUrl);
            parameters.push('?');
        }

        if (category_id) {
            columns.push('category_id');
            values.push(category_id);
            parameters.push('?');
        }

        const uploadQry = `insert into notes(${columns.join(',')}) values(${parameters.join(',')})`


        connection

    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" })
    }
}