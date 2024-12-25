import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload the file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' });

        console.log('File has been uploaded to Cloudinary');
        fs.unlinkSync(localFilePath); // Clean up local file
        return response;
    } catch (error) {
        console.error('Error while uploading file to Cloudinary:', error.message);
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); // Remove temp file on failure
        return null;
    }
};

export { uploadOnCloudinary };
