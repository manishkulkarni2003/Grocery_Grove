import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the temp folder exists
const tempFolder = path.join(__dirname, "../public/temp");
if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder, { recursive: true });
}

// Configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempFolder); // Use the absolute path to temp folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Retaining the original file name
    }
});

export const upload = multer({ storage });
