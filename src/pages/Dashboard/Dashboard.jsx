import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Shield,
  Users,
  FolderOpen,
  Upload,
  LogOut,
  CircleUserRound,
  Clock3,
  CalendarDays,
  Sparkles
} from "lucide-react";

import MemberDropdown from "../../components/MemberDropdown";
import SearchBar from "../../components/SearchBar";
import DocumentCard from "../../components/DocumentCard";
import UploadModal from "../../components/UploadModal/UploadModal";

import { getDocuments } from "../../services/documentService";
import { getMembers } from "../../services/memberService";

function Dashboard() {

  const navigate = useNavigate();

  const [members, setMembers] = useState([]);

  const [documents, setDocuments] = useState([]);

  const [showUpload, setShowUpload] = useState(false);

  const [selectedMember, setSelectedMember] = useState("");

  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {

    const timer = setInterval(() => {

        setCurrentTime(new Date());

    },1000);

    return ()=>clearInterval(timer);

},[]);

const greeting=()=>{

    const hour=currentTime.getHours();

    if(hour<12) return "Good Morning";

    if(hour<17) return "Good Afternoon";

    return "Good Evening";

};

const formattedDate=currentTime.toLocaleDateString("en-IN",{

    weekday:"long",

    day:"numeric",

    month:"long",

    year:"numeric"

});

const formattedTime=currentTime.toLocaleTimeString("en-IN");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/");

      return;

    }

    loadMembers();

    loadDocuments();

  }, []);

  const loadMembers = async () => {

    try {

      const data = await getMembers();

      setMembers(data);

      if (data.length > 0) {

        setSelectedMember(data[0].name);

      }

    }

    catch (err) {

      console.log(err);

    }

  };

  const loadDocuments = async () => {

    try {

      const data = await getDocuments();

      setDocuments(data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const filteredDocuments = documents.filter((doc) => {

    return (

      doc.memberName === selectedMember &&

      doc.title.toLowerCase().includes(

        search.toLowerCase()

      )

    );

  });

  const totalStorage = documents.reduce(

    (sum, doc) => sum + doc.fileSize,

    0

  );

  const storageMB = (

    totalStorage /

    (1024 * 1024)

  ).toFixed(2);

  const totalCategories = new Set(

    documents.map((d) => d.category)

  ).size;

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };
 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">

    {/* ================= HEADER ================= */}

    <header className="bg-slate-900 text-white shadow-xl">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <div className="flex items-center gap-4">

          <div className="bg-blue-600 p-3 rounded-xl">

            <Shield size={22} />

          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-wide">

              QuickSearch

            </h1>

            <p className="text-slate-300 text-sm">

              Secure Family Document Vault

            </p>

          </div>

        </div>

        <div className="flex items-center gap-5">

          <div className="flex items-center gap-2">

            <CircleUserRound size={26} />

            <span className="font-medium">

              Family

            </span>

          </div>

          <button

            onClick={logout}

            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl"

          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </header>



    {/* ================= MAIN ================= */}

    <div className="max-w-[1700px] mx-auto px-8 py-10">


    {/* ================= HERO ================= */}

<div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl shadow-2xl p-10 text-white">

    <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

        {/* Left */}

        <div>

            

            <h2 className="text-5xl font-bold">
    {greeting()}, {selectedMember} 👋
</h2>


           

        </div>

        {/* Right */}

        <div className="space-y-6">

            <div className="flex items-center gap-4">

                <Clock3
                    size={28}
                    className="text-yellow-300"
                />

                <div>

                    <p className="text-sm text-slate-300">

                        Current Time

                    </p>

                    <h2 className="text-3xl font-bold">

                        {formattedTime}

                    </h2>

                </div>

            </div>

            <div className="flex items-center gap-4">

                <CalendarDays
                    size={28}
                    className="text-green-300"
                />

                <div>

                    <p className="text-sm text-slate-300">

                        Today's Date

                    </p>

                    <h2 className="text-xl font-semibold">

                        {formattedDate}

                    </h2>

                </div>

            </div>

        </div>

    </div>

    {/* Quick Actions */}

    <div className="flex flex-wrap gap-4 mt-10">

       

        

        

    </div>

</div>



      {/* ================= TOOLBAR ================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <div className="grid lg:grid-cols-3 gap-6 items-center">

          <MemberDropdown

            members={members}

            selected={selectedMember}

            onChange={setSelectedMember}

          />

          <SearchBar

            search={search}

            setSearch={setSearch}

          />

          <button

            onClick={() => setShowUpload(true)}

            className="flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"

          >

            <Upload size={18} />

            Upload Document

          </button>

        </div>

      </div>



      {/* ================= TITLE ================= */}

      <div className="flex justify-between items-center mt-10">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">

            {selectedMember}'s Documents

          </h2>

          <p className="text-gray-500 mt-2">

            Securely stored family documents.

          </p>

        </div>

      </div>



      {/* ================= DOCUMENT GRID ================= */}

      {

        filteredDocuments.length === 0 ?

        (

          <div className="bg-white rounded-2xl shadow-lg py-20 mt-8 text-center">

            <FolderOpen

              size={60}

              className="mx-auto text-gray-300"

            />

            <h2 className="text-2xl font-semibold mt-5">

              No Documents Found

            </h2>

            <p className="text-gray-500 mt-2">

              Upload your first document.

            </p>

          </div>

        )

        :

        (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7 mt-8">

            {

              filteredDocuments.map((doc)=>(

                <DocumentCard

                  key={doc.id}

                  doc={doc}

                  refresh={loadDocuments}

                />

              ))

            }

          </div>

        )

      }



      {

        showUpload &&

        (

          <UploadModal

            members={members}

            refresh={loadDocuments}

            onClose={() => setShowUpload(false)}

          />

        )

      }

    </div>

  </div>

);

}

export default Dashboard;