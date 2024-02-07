import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req?.headers?.authorization;
        if (!authHeader) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "You are not authenticated" })
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
            if (payload) {
                req.payload = payload;
                next();

            } else if (err?.message && err.message === 'jwt expired') {
                return res.status(401).json({
                    success: false,
                    message: "Your access token has expired. Please log in again to continue."
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "User not authenticated",
                })
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}