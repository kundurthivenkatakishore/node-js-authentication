import Users from "../models/Users.js";
import generateTokens from "../utils/generateToken.js";
import bcrypt from "bcrypt"

//signup 
export const signup = async (req, res) => {
    console.log(req.body);
    try {
        //get the user input details from the body
        const { name, email, age, gender, password } = req.body;

        //encrypting the password using bcryptjs library
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let savedUser;

        //checking if all the fields are there or not
        if (!name || !email || !age || !gender || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all the required fields' })
        }

        // Email exist or not, if exists throwing error
        let emailExist = await Users.exists({ email: email });
        if (emailExist) {
            return res.status(400).json({ emailError: true, message: "An account with this email already exists" })
        }

        //name format
        const nameRegex = /^[A-Za-z][A-Za-z .]{2,39}$/
        if (!nameRegex.test(name)) {
            return res.status(400).json({ nameError: true, message: "The name should only have alphabetic characters, with a minimum length of 3 characters and a maximum length of 40 characters." })
        }

        //checking type of age is not number, throwing error
        if (typeof age !== 'number') {
            return res.status(400).json({ ageError: true, message: "Age must be a number." })
        }

        let genderInfo = ["male", "female", "others"]
        if (typeof gender !== "string") {
            return res.status(400).json({ genderError: true, message: "Gender must be a string." })
        }
        if (!genderInfo.includes(gender.toLowerCase())) {
            return res.status(400).json({ genderError: true, message: "The gender must be one of the following options: 'male', 'female', or 'others'." })
        }

        // email format
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ emailError: true, message: "Please enter a valid email address" })
        }
        if (email?.length > 50) {
            return res.status(400).json({ emailError: true, message: "Email length must be less than 50 characters." })
        }

        //password format
        if (typeof password !== "string") {
            return res.status(400).json({ passwordError: true, message: "Password must be a string." })
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ passwordError: true, message: "Password must be at least 8 and 20 characters long and contain at least one uppercase letter, one lowercase letter, and one number." })
        }

        const newUser = new Users({
            name: name,
            email: email,
            age: age,
            gender: gender,
            password: hash
        });
        //saving the user details in the database
        savedUser = await newUser.save({})
        return res.status(200).json({
            success: true,
            message: "Congratulations on successfully signing-up!",
        });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Error while signing up! Try again!" })
    }
};

//login
export const login = async (req, res,) => {
    try {
        let { email, password } = req.body;

        //checking if value is there r not
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        } else if (!password) {
            return res.json({ success: false, message: "Password is required" });
        }

        //checking the types of input values
        if (typeof email !== "string") {
            return res.json({ passwordError: true, message: "Password must me a string" })
        }
        if (typeof password !== "string") {
            return res.json({ passwordError: true, message: "Password must me a string" })
        }

        //checking if user is found or not is not throwing error
        let userFound = await Users.exists({ email: email });
        if (!userFound) {
            return res.status(400).json({ emailError: true, message: "User not found!" })
        }

        email = email.toLowerCase();
        const user = await Users.findOne({ email: email }).select("name email password age gender").lean();

        //checking password if correct or not
        const passwordVerified = await bcrypt.compare(password, user.password);
        if (!passwordVerified) {
            return res.status(400).json({ passwordError: true, message: "Password Incorrect" });
        }

        let payload = { _id: user._id, email: user.email, age: user.age };
        const { accessToken } = await generateTokens(payload, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
            accessToken,
            success: true,
            message: "Authentication success",
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error while logging in!" })
    }
};

//get user details
export const getUserDetails = async (req, res) => {
    try {
        console.log(req.payload);
        const userID = req.payload._id;
        const userDetails = await Users.findById(userID).select('name email age gender').lean();

        return res.status(200).json({
            userDetails: userDetails,
            message: 'Successfully fetched user details.',
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Error while fetching user details" })
    }
}