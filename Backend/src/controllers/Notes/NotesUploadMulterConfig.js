import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";
import fs from 'fs';

const CurrFileName = fileURLToPath(import.meta.url);
const CurrDirName = path.dirname(CurrFileName);

const UploadsDir = path.join(CurrDirName, '../../Pdf_notes/uploads');

try {
    if (!fs.existsSync(UploadsDir)) {
        fs.mkdirSync(UploadsDir, { recursive: true });
    }
} catch (error) {
    console.error("Failed to create uploads directory:", error);
    throw error;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

function fileFilter(request, file, callback) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt === '.pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
}

export const upload = multer({ storage: storage, fileFilter: fileFilter });
