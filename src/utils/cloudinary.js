require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "social",
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
const deleteFromCloudinary = async (publicId) => {
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

