const db = require("../database/db");

// GET ALL MEMBERS

const getMembers = (req, res) => {

    db.all(
        "SELECT * FROM members",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                data: rows
            });

        }
    );

};

module.exports = {
    getMembers
};