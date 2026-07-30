function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white shadow-xl rounded-2xl w-[400px] p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          QuickSearch
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Secure Family Document Vault
        </p>

        <div className="mt-8">

          <label className="font-medium">
            Username
          </label>

          <input
            type="text"
            className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="mt-5">

          <label className="font-medium">
            Password
          </label>

          <input
            type="password"
            className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;