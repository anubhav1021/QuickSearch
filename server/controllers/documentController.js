const fs = require("fs");
const path = require("path");
const db = require("../database/db");

/* ===========================
   GET ALL DOCUMENTS
=========================== */

const getDocuments = (req, res) => {

    db.all(

        `
        SELECT

            documents.*,

            members.name AS memberName

        FROM documents

        JOIN members

        ON members.id = documents.memberId
        `,

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

/* ===========================
   UPLOAD DOCUMENT
=========================== */

const uploadDocument = (req, res) => {

    try {

        const {

            memberId,

            title,

            category

        } = req.body;

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file selected"

            });

        }

        db.run(

            `
            INSERT INTO documents(

                memberId,

                title,

                category,

                originalName,

                storedName,

                fileType,

                fileSize,

                uploadDate

            )

            VALUES(?,?,?,?,?,?,?,?)
            `,

            [

                memberId,

                title,

                category,

                req.file.originalname,

                req.file.filename,

                req.file.mimetype,

                req.file.size,

                new Date().toISOString()

            ],

            function (err) {

                if (err) {

                    return res.status(500).json({

                        success: false,

                        message: err.message

                    });

                }

                res.json({

                    success: true,

                    message: "Document Uploaded",

                    id: this.lastID

                });

            }

        );

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

/* ===========================
   DOWNLOAD DOCUMENT
=========================== */

const downloadDocument = (req, res) => {

    const { id } = req.params;

    db.get(

        "SELECT * FROM documents WHERE id=?",

        [id],

        (err, row) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            if (!row) {

                return res.status(404).json({

                    success: false,

                    message: "Document Not Found"

                });

            }

            const filePath = path.join(

                __dirname,

                "../uploads",

                row.storedName

            );

            res.download(

                filePath,

                row.originalName

            );

        }

    );

};

/* ===========================
   DELETE DOCUMENT
=========================== */

const deleteDocument = (req, res) => {

    const { id } = req.params;

    db.get(

        "SELECT * FROM documents WHERE id=?",

        [id],

        (err, row) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            if (!row) {

                return res.status(404).json({

                    success: false,

                    message: "Document Not Found"

                });

            }

            const filePath = path.join(

                __dirname,

                "../uploads",

                row.storedName

            );

            if (fs.existsSync(filePath)) {

                fs.unlinkSync(filePath);

            }

            db.run(

                "DELETE FROM documents WHERE id=?",

                [id],

                function (err) {

                    if (err) {

                        return res.status(500).json({

                            success: false,

                            message: err.message

                        });

                    }

                    res.json({

                        success: true,

                        message: "Document Deleted"

                    });

                }

            );

        }

    );

};

module.exports = {

    getDocuments,

    uploadDocument,

    downloadDocument,

    deleteDocument

};