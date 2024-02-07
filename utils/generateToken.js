import jwt from "jsonwebtoken";

const generateTokens = async (user, access) => {
    try {
        const payload = user;
        const accessToken = jwt.sign(
            payload,
            access,
            { expiresIn: "1d" }
        );

        return Promise.resolve({ accessToken })
    } catch (err) {
        return Promise.reject(err);
    }
}

export default generateTokens;