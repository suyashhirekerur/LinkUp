import React from 'react';
import { Routes, Route } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuthStore } from './store/useAuthStore.js';

const App = () => {
    const { authUser, login, isLoggedIn } = useAuthStore();

    console.log("Auth User: ", authUser);
    console.log("isLoggedIn: ", isLoggedIn);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center" style={{ minHeight: "100vh" }}>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:32px_32px] animate-grid" />
            <div className="absolute -top-32 -left-24 h-[450px] w-[450px] rounded-full bg-pink-500/25 blur-[120px] animate-blob" />
            <div className="absolute -bottom-32 -right-24 h-[450px] w-[450px] rounded-full bg-cyan-500/25 blur-[120px] animate-blob animation-delay-4000" />

            {/* Purple Blob */}
            <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px] animate-blob animation-delay-2000" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full bg-white/20 animate-float"
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${12 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Your content */}
            <div className="relative z-10">
                {/* Content here */}
            </div>

            <button onClick={login} className="z-10">login</button>

            <div className="relative z-10 w-full">
                <Routes>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </div>
        </div>

    );
};

export default App;