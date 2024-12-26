import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload buffer to Cloudinary
const uploadOnCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        // Convert buffer to base64
        const b64 = Buffer.from(fileBuffer).toString('base64');
        const dataURI = `data:image/jpeg;base64,${b64}`;

        // Upload to cloudinary
        const response = await cloudinary.uploader.upload(dataURI, {
            resource_type: 'auto'
        });

        console.log('File has been uploaded to Cloudinary');
        return response;
    } catch (error) {
        console.error('Error while uploading to Cloudinary:', error.message);
        return null;
    }
};

export { uploadOnCloudinary };