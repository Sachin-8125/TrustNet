import { useState } from "react";
import {ShieldIcon} from './icons'
export default function LoginPage({onLogin, error, onSwitchMode}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                        <ShieldIcon />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">TrustNet</h1>
                    <p className="text-gray-500 mt-1">Financial Safety for Our Elders</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. savita@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                         <p className="text-xs text-gray-400 mt-1">Hint: Use 'savita@example.com' or 'rohan@example.com'</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Any password will work"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <button onClick={onSwitchMode} className="font-semibold text-blue-600 hover:text-blue-500">
                        Sign Up
                    </button>
                </p>
            </div>
             <p className="text-gray-500 text-sm mt-8 text-center">A digital guardian for your peace of mind.</p>
        </div>
    );
}