import React from 'react'
import { useChatStore } from '../store/useChatStore.js'

function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useChatStore()

    return (
        <div className="flex gap-2 bg-transparent p-2 m-2 rounded-xl border border-slate-700/50">
            <button
                onClick={() => { setActiveTab("chats") }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400 shadow-sm" : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"}`}
            >
                Chats
            </button>
            <button
                onClick={() => { setActiveTab("contacts") }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400 shadow-sm" : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"}`}
            >
                Contacts
            </button>
        </div>
    )
}

export default ActiveTabSwitch