const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const verifyToken = require("../middleware/auth");

const {

    getDocuments,

    uploadDocument,

    downloadDocument,

    deleteDocument

} = require("../controllers/documentController");

router.get(
    "/",
    verifyToken,
    getDocuments
);

router.post(
    "/upload",
    verifyToken,
    upload.single("document"),
    uploadDocument
);

router.get(
    "/download/:id",
    verifyToken,
    downloadDocument
);

router.delete(
    "/:id",
    verifyToken,
    deleteDocument
);
module.exports = router;