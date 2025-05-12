import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";
import fs from 'fs';



const CurrFileName = fileURLToPath(import.meta.url);
const CurrDirName = path.dirname(CurrFileName);


const UploadsDir = path.join(CurrDirName,'../../Pdf_notes/uploads');

if (!fs.existsSync(UploadsDir)) {
    fs.mkdirSync(UploadsDir,{recursive:true});
}

const storage = multer.diskStorage({
    destination: function(request,file,callback){
        callback(null,UploadsDir);
    },
    filename: function(request,file,callback){
        callback(null,file.originalname);
    }
});

export const upload = multer({storage:storage})




