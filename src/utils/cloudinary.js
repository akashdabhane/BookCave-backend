const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({
    path: "./config.env"
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
})

// extract public id from url
const extractPublicId = (url) => {
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "BookCave",
            resource_type: "auto",
        })

        // file uploaded on cloudinary
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)    // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

// Function to delete an image
const deleteFromCloudinary = async (url) => {
    const publicId = extractPublicId(url);
    if (!publicId) return null

    // delete the image from cloudinary
    const deleteResponse = await cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
            console.log('Error deleting image:', error);
        }
        console.log(result)
    });

    return deleteResponse;
}

module.exports = {
    uploadOnCloudinary,
    deleteFromCloudinary,
};