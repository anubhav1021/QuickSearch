const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const USERNAME = "family";

// Password = QuickSearch@2026
const HASHED_PASSWORD = bcrypt.hashSync("QuickSearch@2026", 10);

const login = async (req, res) => {

    const { username, password } = req.body;

    if (username !== USERNAME) {

        return res.status(401).json({
            success: false,
            message: "Invalid Username"
        });

    }

    const validPassword = await bcrypt.compare(
        password,
        HASHED_PASSWORD
    );

    if (!validPassword) {

        return res.status(401).json({
            success: false,
            message: "Invalid Password"
        });

    }

    const token = jwt.sign(

        {
            username
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "30d"
        }

    );

    res.json({

        success: true,

        token

    });

};

module.exports = {

    login

};