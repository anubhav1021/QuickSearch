import {
  FileText,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  Eye,
  Download,
  Trash2
} from "lucide-react";
import { deleteDocument } from "../services/documentService";

function DocumentCard({ doc, refresh }) {

  const formatFileSize = (bytes) => {

    if (!bytes) return "0 KB";

    if (bytes < 1024)
      return bytes + " B";

    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(2) + " KB";

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";

  };

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString("en-IN", {

      day: "2-digit",

      month: "short",

      year: "numeric"

    });

  };

  const getIcon = () => {

    const type = doc.fileType.toLowerCase();

    if (type.includes("pdf")) {

        return <FileText size={48} className="text-red-500" />;

    }

    if (type.includes("image")) {

        return <FileImage size={48} className="text-blue-500" />;

    }

    if (
        type.includes("word") ||
        type.includes("document")
    ) {

        return <FileText size={48} className="text-blue-700" />;

    }

    if (
        type.includes("excel") ||
        type.includes("sheet")
    ) {

        return <FileSpreadsheet size={48} className="text-green-600" />;

    }

    return <FileArchive size={48} className="text-gray-500" />;

};

  const badgeColor = () => {

    switch (doc.category) {

      case "Identity":

        return "bg-blue-100 text-blue-700";

      case "Finance":

        return "bg-green-100 text-green-700";

      case "Medical":

        return "bg-red-100 text-red-700";

      case "Education":

        return "bg-purple-100 text-purple-700";

      case "Property":

        return "bg-orange-100 text-orange-700";

      default:

        return "bg-gray-100 text-gray-700";

    }

  };

  const previewDocument = () => {

    window.open(

      `http://localhost:5000/uploads/${doc.storedName}`,

      "_blank"

    );

  };

  const downloadDocument = () => {

    const token = localStorage.getItem("token");

    window.open(

      `http://localhost:5000/api/documents/download/${doc.id}?token=${encodeURIComponent(token)}`,

      "_blank"

    );

  };

  const removeDocument = async () => {

    if (!window.confirm("Delete this document?"))
      return;

    try {

      await deleteDocument(doc.id);

      refresh();

    }

    catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-slate-900 to-blue-700 p-6 flex justify-between items-center">

        {getIcon()
        }

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor()}`}
        >
          {doc.category}
        </span>

      </div>

      {/* Body */}

      <div className="p-6">

        <h2 className="text-xl font-bold text-slate-800">

          {doc.title}

        </h2>

        <p className="text-gray-500 text-sm mt-1 break-all">

          {doc.originalName}

        </p>

        <div className="mt-6 space-y-3 text-sm">

          <div className="flex justify-between">

            <span className="text-gray-500">

              File Type

            </span>

            <span className="font-semibold">

              {doc.fileType.split("/")[1]?.toUpperCase()}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">

              Size

            </span>

            <span className="font-semibold">

              {formatFileSize(doc.fileSize)}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">

              Uploaded

            </span>

            <span className="font-semibold">

              {formatDate(doc.uploadDate)}

            </span>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 grid grid-cols-3">

        <button

          onClick={previewDocument}

          className="flex flex-col items-center gap-2 py-4 hover:bg-blue-50 transition"

        >
<Eye size={18} className="text-blue-600" />

          <span className="text-xs font-semibold">

            Preview

          </span>

        </button>

        <button

          onClick={downloadDocument}

          className="flex flex-col items-center gap-2 py-4 hover:bg-green-50 transition border-l border-r"

        >

         <Download size={18} className="text-green-600" />

          <span className="text-xs font-semibold">

            Download

          </span>

        </button>

        <button

          onClick={removeDocument}

          className="flex flex-col items-center gap-2 py-4 hover:bg-red-50 transition"

        >

          <Trash2 size={18} className="text-red-600" />

          <span className="text-xs font-semibold">

            Delete

          </span>

        </button>

      </div>

    </div>

  );

}

export default DocumentCard;