import axios from "axios";
import { useState } from "react";

function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/login', JSON.stringify(credentials), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = res.data;
            sessionStorage.setItem(Object.keys(data), Object.values(data));
            window.location.href = '/home';
        } catch(error) {
            console.log(error.response.data);
        }
      };

    return (
        <div className="flex justify-center items-center border-2 border-blue w-full min-h-screen">
            <div className="border-2 border-pink h-100 m-8">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Login
                </h1>
                <form className="flex flex-col p-8" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id='email'
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={credentials.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id='password'
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="bg-sky-500 hover:bg-sky-700 w-full py-2 px-4 rounded"                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage;