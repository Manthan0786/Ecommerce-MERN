import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [credentials, setCredentials] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/signup', JSON.stringify(credentials), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = res.data;
            if (data) {
                const { token } = data;
                sessionStorage.setItem('token', token);
                alert('User successfully created!')
                setTimeout(()=>{
                    navigate('/home');
                }, 2000)
            }
        } catch (error) {
            setError(error.response.data.error)
        }
    };

    return (
        <div className="flex justify-center items-center border-2 border-blue w-full min-h-screen">
            <div className="border-2 border-pink h-100 m-8">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Sign up
                </h1>

                <form className="flex flex-col p-8" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        {error && (
                            <div className="text-red-700 text-center">
                                {error}
                            </div>
                        )}
                        <label
                            htmlFor="firstname"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Firstname
                        </label>
                        <input
                            type="firstname"
                            id='firstname'
                            name="firstname"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={credentials.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="lastname"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Lastname
                        </label>
                        <input
                            type="lasname"
                            id='lastname'
                            name="lastname"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={credentials.lastname}
                            onChange={handleChange}
                        />
                    </div>
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
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;