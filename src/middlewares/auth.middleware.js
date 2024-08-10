const userdb = require("../model/user.model");
const jwt = require("jsonwebtoken");

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await userdb.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({ message: error?.message || "Invalid access token" });
    }
}