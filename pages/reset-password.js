import { useRouter } from "next/router";
import { useState, FormEventHandler } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PasswordRecoveryPage() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null)
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const router = useRouter();

  const accessToken = router.query.access_token;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      alert("Passwords do not match.");
      return;
    }
    
    try {
        supabase.auth.update({ password: password })
        router.push("/app")
    } catch (err) {
        console.error(err)
        alert("Something went wrong. Please try again. If the problem persists, reach out to us at info@kinshipcanada.com and we will be happy to help.")
    }

  };

  return (
      <>

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
            className="mx-auto h-12 w-auto"
            src="/logo.png"
            alt="Kinship Canada"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your Kinship Password</h2>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form  onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                New Password
            </label>
            <div className="mt-1">
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    required
                    onChange={(e)=>{setPassword(e.target.value)}}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            </div>

            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
            </label>
            <div className="mt-1">
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={passwordRepeat}
                    onChange={(e)=>{setPasswordRepeat(e.target.value)}}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            </div>

            <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Reset Password &rarr;
            </button>
            </div>
        </form>

        </div>
        </div>

        </div>
        </div>
    </>
  );
}