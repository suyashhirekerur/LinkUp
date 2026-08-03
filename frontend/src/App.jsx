import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import useAuthStore from './store/useAuthStore.js';
import PageLoader from './components/PageLoader.jsx';
import { Toaster } from "react-hot-toast";

const floatingParticles = Array.from({ length: 25 }, (_, index) => ({
    id: index,
    size: 2 + ((index * 3) % 5),
    left: `${(index * 11) % 100}%`,
    top: `${(index * 17) % 100}%`,
    duration: `${12 + (index % 8)}s`,
    delay: `${(index % 10) * 0.8}s`,
}));

const App = () => {
    const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <PageLoader />;

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-900 px-2 py-3 sm:px-3 md:px-5 lg:px-6">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:32px_32px] animate-grid" />
            <div className="absolute -top-32 -left-24 h-[350px] w-[350px] rounded-full bg-pink-500/25 blur-[120px] animate-blob" />
            <div className="absolute -bottom-32 -right-24 h-[350px] w-[350px] rounded-full bg-cyan-500/25 blur-[120px] animate-blob animation-delay-4000" />
            <div className="absolute top-1/3 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px] animate-blob animation-delay-2000" />

            <div className="absolute inset-0 overflow-hidden">
                {floatingParticles.map((particle) => (
                    <span
                        key={particle.id}
                        className="absolute rounded-full bg-white/20 animate-float"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: particle.left,
                            top: particle.top,
                            animationDuration: particle.duration,
                            animationDelay: particle.delay,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex h-[calc(100vh-1.5rem)] w-full items-center justify-center overflow-hidden">
                <Routes>
                    <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
                    <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
                    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
                </Routes>
            </div>

            <Toaster />
        </div>
    );
};

export default App;