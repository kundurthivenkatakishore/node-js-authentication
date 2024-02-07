import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true, min: 3, max: 40 },
        email: { type: String, trim: true, required: true, unique: true, max: 50, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
        age: { type: Number, required: true },
        gender: { type: String, required: true, enum: ['male', 'female', 'others'] },
        password: { type: String, trim: true, required: true },
    },
    { collection: "Users", timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);

export default Users;
