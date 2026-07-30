import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import useAuthStore from './store/useAuthStore.js';
import PageLoader from './components/PageLoader.jsx';
import {Toaster} from "react-hot-toast"

const App = () => {
    const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log({ authUser });

    if (isCheckingAuth) return <PageLoader />;

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

            <Routes>
                <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
            </Routes>

            <Toaster /> 
        </div>

    );
};

export default App;