import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
        process.exit();
    }
}