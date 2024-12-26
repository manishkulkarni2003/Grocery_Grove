import multer from "multer";

// Configure multer to use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Configure multer with file validation
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024  // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});