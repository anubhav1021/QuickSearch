import { useState } from "react";
import axios from "axios";

import {
  CloudUpload,
  FileText,
  X
} from "lucide-react";

function UploadModal({

  members,

  onClose,

  refresh

}) {

  const [memberId, setMemberId] = useState(

    members[0]?.id || ""

  );

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("Identity");

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const uploadDocument = async () => {

    if (!file) {

      alert("Please choose a file");

      return;

    }

    setLoading(true);

    const formData = new FormData();

    formData.append("memberId", memberId);

    formData.append("title", title);

    formData.append("category", category);

    formData.append("document", file);

    try {

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/documents/upload`,

        formData,

        {

          headers: {

            Authorization:

              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      refresh();

      onClose();

    }

    catch (err) {

      console.log(err);

      alert("Upload Failed");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-slate-900 to-blue-700 text-white px-8 py-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">

              Upload Document

            </h2>

            <p className="text-sm text-slate-200 mt-1">

              Store documents securely for your family.

            </p>

          </div>

          <button

            onClick={onClose}

            className="hover:text-red-300 transition"

          >

           <X size={24} />

          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-5">

          <div>

            <label className="block text-sm font-semibold mb-2">

              Family Member

            </label>

            <select

              value={memberId}

              onChange={(e)=>setMemberId(e.target.value)}

              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

            >

              {

                members.map(member=>(

                  <option

                    key={member.id}

                    value={member.id}

                  >

                    {member.name}

                  </option>

                ))

              }

            </select>

          </div>

          <div>

            <label className="block text-sm font-semibold mb-2">

              Document Title

            </label>

            <input

              value={title}

              onChange={(e)=>setTitle(e.target.value)}

              placeholder="Example: Aadhaar Card"

              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />

          </div>

          <div>

            <label className="block text-sm font-semibold mb-2">

              Category

            </label>

            <select

              value={category}

              onChange={(e)=>setCategory(e.target.value)}

              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

            >

              <option>Identity</option>

              <option>Education</option>

              <option>Finance</option>

              <option>Medical</option>

              <option>Property</option>

            </select>

          </div>

          <div>

            <label className="block text-sm font-semibold mb-3">

              Choose File

            </label>

            <label className="border-2 border-dashed border-blue-300 rounded-2xl flex flex-col items-center justify-center py-10 cursor-pointer hover:bg-blue-50 transition">

              <CloudUpload

                className="text-blue-600"

                size={55}

              />

              <p className="mt-4 font-medium">

                Click to Browse

              </p>

              <p className="text-sm text-gray-500">

                PDF • JPG • PNG • DOCX

              </p>

              <input

                type="file"

                className="hidden"

                onChange={(e)=>setFile(e.target.files[0])}

              />

            </label>

          </div>

          {

            file &&

            <div className="bg-slate-100 rounded-xl p-4 flex items-center gap-3">

             <FileText
    className="text-blue-600"
    size={22}
/>

              <div>

                <p className="font-semibold">

                  {file.name}

                </p>

                <p className="text-sm text-gray-500">

                  {(file.size/1024).toFixed(2)} KB

                </p>

              </div>

            </div>

          }

        </div>

        {/* Footer */}

        <div className="bg-slate-100 px-8 py-5 flex justify-end gap-4">

          <button

            onClick={onClose}

            className="px-6 py-3 rounded-xl border hover:bg-gray-200 transition"

          >

            Cancel

          </button>

          <button

            disabled={loading}

            onClick={uploadDocument}

            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"

          >

            {

              loading

              ?

              "Uploading..."

              :

              "Upload Document"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default UploadModal;