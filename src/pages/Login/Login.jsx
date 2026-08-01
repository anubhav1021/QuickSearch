import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { login } from "../../services/authService";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!username || !password) {

      alert("Please enter username and password.");

      return;

    }

    try {

      setLoading(true);

      const response = await login(
        username,
        password
      );

      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/dashboard");

    }

    catch (err) {

      alert("Invalid Username or Password");

    }

    finally {

      setLoading(false);

    }

  };
  return (

<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex">

    {/* ================= LEFT PANEL ================= */}

    

    {/* ================= RIGHT PANEL ================= */}

    <div className="flex-1 flex justify-center items-center p-8">

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-10">

            <div className="flex flex-col items-center">

                <div className="bg-blue-600 text-white p-5 rounded-3xl shadow-lg">

                    <Shield size={34} />

                </div>

                <h2 className="text-3xl font-bold mt-6">

                    Welcome Back

                </h2>

                <p className="text-gray-500 mt-2">

                    Sign in to access your secure family vault

                </p>

            </div>

            {/* Username */}

            <div className="mt-10">

                <label className="text-sm font-semibold text-slate-700">

                    Username

                </label>

                <div className="mt-2 relative">

                  

                    <input
    type="text"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}
    placeholder="Enter Username"
    className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"></input>

                </div>

            </div>

            {/* Password */}

            <div className="mt-6">

                <label className="text-sm font-semibold text-slate-700">

                    Password

                </label>

                <div className="relative mt-2">

                    
                    <input

                        type={showPassword ? "text" : "password"}

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                        placeholder="Enter Password"

                        className="w-full h-12 px-4 pr-14 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"

                    />

                    <button

                        type="button"

                        onClick={()=>setShowPassword(!showPassword)}

                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"

                    >

                        {

                            showPassword

                            ?

                            <EyeOff size={18}/>

                            :

                            <Eye size={18}/>

                        }

                    </button>

                </div>

            </div>
                        {/* Login Button */}

            <button

                onClick={handleLogin}

                disabled={loading}

                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-3 transition-all duration-300"

            >

                {

                    loading

                    ?

                    <>

                        <Loader2

                            size={20}

                            className="animate-spin"

                        />

                        Signing In...

                    </>

                    :

                    <>

                        Secure Login

                        <ArrowRight size={18} />

                    </>

                }

            </button>

            {/* Security Info */}

            <div className="mt-10 border-t pt-6">

                <div className="flex items-center gap-3 mb-3">

                    <CheckCircle2

                        size={18}

                        className="text-green-600"

                    />

                    <span className="text-sm text-slate-600">

                        JWT Protected Authentication

                    </span>

                </div>

                <div className="flex items-center gap-3 mb-3">

                    <CheckCircle2

                        size={18}

                        className="text-green-600"

                    />

                    <span className="text-sm text-slate-600">

                        Secure Document Storage

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <CheckCircle2

                        size={18}

                        className="text-green-600"

                    />

                    <span className="text-sm text-slate-600">

                        Family Access Only

                    </span>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-10 text-center text-sm text-slate-500">

                <p className="font-semibold">

                    QuickSearch v1.0

                </p>

                <p className="mt-1">

                    Secure Family Document Vault

                </p>

                <p className="mt-2 text-xs text-slate-400">

                    © 2026 Anubhav Punia. All Rights Reserved.

                </p>

            </div>

        </div>

    </div>

</div>

);
}

export default Login;