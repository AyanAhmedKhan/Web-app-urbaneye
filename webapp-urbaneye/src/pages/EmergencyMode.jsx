import { useState, useEffect } from 'react';
import { AlertOctagon, Siren, Zap, Droplets, Wind, MapPin, Clock, Users, ChevronRight, CheckCircle, Phone } from 'lucide-react';

const incidents = [
    { id: 'EM-001', type: 'Fallen Electrical Pole', zone: 'Andheri East, S.V. Road', status: 'dispatched', priority: 'critical', dept: 'Electricity', responders: 4, reported: '6 min ago', icon: '⚡' },
    { id: 'EM-002', type: 'Open Manhole – Flooding Risk', zone: 'Dharavi, 90 Feet Road', status: 'en_route', priority: 'critical', dept: 'Municipal Roads', responders: 2, reported: '11 min ago', icon: '🕳️' },
    { id: 'EM-003', type: 'Gas Leak Suspected', zone: 'Bandra West, Hill Road', status: 'on_scene', priority: 'high', dept: 'Gas & Safety', responders: 6, reported: '19 min ago', icon: '🔥' },
    { id: 'EM-004', type: 'Waterlogging – Road Blocked', zone: 'Kurla Station East', status: 'dispatched', priority: 'high', dept: 'Water & Drainage', responders: 3, reported: '28 min ago', icon: '🌊' },
];

const statusConfig = {
    dispatched: { label: 'Dispatched', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    en_route: { label: 'En Route', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    on_scene: { label: 'On Scene', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    resolved: { label: 'Resolved', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
};

const EmergencyMode = () => {
    const [elapsed, setElapsed] = useState(0);
    const [selected, setSelected] = useState(null);
    const [activating, setActivating] = useState(false);
    const [alertsSent, setAlertsSent] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (s) => `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const handleBroadcast = () => {
        setActivating(true);
        setTimeout(() => { setActivating(false); setAlertsSent(true); }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Emergency Banner */}
            <div className="bg-red-600 py-3 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Siren size={20} className="animate-pulse" />
                        <span className="font-black text-sm tracking-widest uppercase">EMERGENCY MODE ACTIVE</span>
                        <span className="font-mono text-red-200 text-sm">{formatTime(elapsed)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-200 text-xs">
                        <span className="animate-pulse">●</span> Heavy Rainfall Alert: Mumbai Suburban Region
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                            <AlertOctagon size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg leading-none">Emergency Response Center</h1>
                            <p className="text-slate-400 text-xs">Disaster Mode – Priority Escalation Active</p>
                        </div>
                    </div>
                    <button
                        onClick={handleBroadcast}
                        disabled={activating || alertsSent}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm transition-all ${alertsSent ? 'bg-emerald-600 cursor-default' : 'bg-red-600 hover:bg-red-700 animate-pulse'}`}
                    >
                        {activating ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>) :
                            alertsSent ? (<><CheckCircle size={16} />Alerts Broadcast</>) :
                                (<><Siren size={16} />Broadcast Alert</>)}
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Active Incidents', value: incidents.length, color: 'from-red-500 to-rose-700', icon: AlertOctagon },
                        { label: 'Responders Deployed', value: incidents.reduce((a, b) => a + b.responders, 0), color: 'from-amber-500 to-orange-600', icon: Users },
                        { label: 'Depts Alerted', value: 5, color: 'from-blue-500 to-indigo-600', icon: Phone },
                        { label: 'Critical Zones', value: incidents.filter(i => i.priority === 'critical').length, color: 'from-purple-500 to-violet-600', icon: MapPin },
                    ].map(({ label, value, color, icon: Icon }) => (
                        <div key={label} className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                            <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3`}><Icon size={18} /></div>
                            <div className="text-3xl font-black text-white">{value}</div>
                            <div className="text-slate-400 text-xs mt-1">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Auto-prioritized feed */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={16} className="text-red-400" />
                        <h2 className="font-bold text-white">Auto-Prioritized Incidents</h2>
                        <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">AI Sorted by Severity</span>
                    </div>
                    <div className="space-y-3">
                        {incidents.map((inc, rank) => {
                            const cfg = statusConfig[inc.status];
                            const isCritical = inc.priority === 'critical';
                            return (
                                <div key={inc.id}
                                    onClick={() => setSelected(selected === inc.id ? null : inc.id)}
                                    className={`bg-slate-900 rounded-2xl border cursor-pointer transition-all ${isCritical ? 'border-red-500/30 hover:border-red-500/60' : 'border-amber-500/20 hover:border-amber-500/40'} ${selected === inc.id ? 'ring-1 ring-red-500/20' : ''}`}
                                >
                                    <div className="p-5 flex items-center gap-5">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${isCritical ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                                            {rank + 1}
                                        </div>
                                        <span className="text-3xl flex-shrink-0">{inc.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-bold text-white">{inc.type}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>{cfg.label}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                    {inc.priority.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-slate-400 text-xs">
                                                <span className="flex items-center gap-1"><MapPin size={10} />{inc.zone}</span>
                                                <span className="flex items-center gap-1"><Clock size={10} />{inc.reported}</span>
                                                <span className="flex items-center gap-1"><Users size={10} />{inc.responders} responders</span>
                                            </div>
                                        </div>
                                        <span className="text-slate-500 text-xs bg-slate-800 px-3 py-1 rounded-full">{inc.dept}</span>
                                    </div>
                                    {selected === inc.id && (
                                        <div className="border-t border-white/5 p-4 flex gap-2">
                                            <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl">Escalate Priority</button>
                                            <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl">Call Dept Head</button>
                                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-bold rounded-xl border border-white/10">View on Map</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Department Alert Status */}
                <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Phone size={16} className="text-blue-400" />Department Alert Status</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {[
                            { dept: 'Electricity Board', status: 'Acknowledged', ok: true },
                            { dept: 'Water & Drainage', status: 'Acknowledged', ok: true },
                            { dept: 'Fire Brigade', status: 'Acknowledged', ok: true },
                            { dept: 'Gas Authority', status: 'Pending Response', ok: false },
                            { dept: 'Traffic Police', status: 'Acknowledged', ok: true },
                        ].map(({ dept, status, ok }) => (
                            <div key={dept} className={`rounded-xl p-3 border ${ok ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                                <div className={`text-xs font-bold mb-1 ${ok ? 'text-emerald-400' : 'text-amber-400'}`}>{ok ? '✓' : '⏳'} {status}</div>
                                <div className="text-white text-xs">{dept}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyMode;
