import { StatusCodes } from "http-status-codes";
import path from 'path';
import { fileURLToPath } from "url";
import fs from 'fs';
import pool from "../../DbConfig/promiseDbConfig.js";


const CurrDirName = path.dirname(fileURLToPath(import.meta.url));

export async function uploadNotes(request, response) {
    try {
        const file = request.file;
        const username = request.user.username;
        const { title, type, text, category_id } = request.body;
        const [prnResult]= await pool.query(`select prn from student where username='${username}'`);
        const prn_no = prnResult[0].prn
        const columns = ['title', 'type', 'text', 'created_by', 'created_at', 'category_id'];
        const values = [title, type, text, prn_no, new Date(), category_id];
        const parameters = ['?', '?', '?', '?', '?', '?'];
        if (file) {
            
            const UploadsDir = path.join(CurrDirName, '../../../Pdf_Notes/uploads', username);
            const FinalFileUploadPath = path.join(UploadsDir, file.originalname);
            if (!fs.existsSync(UploadsDir)) {
                fs.mkdirSync(UploadsDir,{recursive:true});
            }
            fs.renameSync(file.path, FinalFileUploadPath);

            const dbFilePath = path.join(username,"/",file.originalname)
            const pdfUrl = dbFilePath.replace(/\\/g, '/');
            values.push(pdfUrl);
            parameters.push('?');
            columns.push('pdf_url')

        }
        const InsertQuery = `insert into notes(${columns.join(',')}) values(${parameters.join(',')})`
        try {
            await pool.query(InsertQuery,values);
            response
            .status(StatusCodes.CREATED)
            .send({message:"Notes Added Successfully"})
        } catch (error) {
            console.log(error);
            response
            .status(StatusCodes.BAD_REQUEST)
            .send({message:"Error while inserting data"})
        }
        
        
    } catch (error) {
        console.log(error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}

