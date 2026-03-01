import { useState, useEffect } from 'react';
import { Flame, AlertOctagon, MapPin, Clock, RefreshCw, CheckCircle, Activity, Eye, Phone, Shield, AlertTriangle } from 'lucide-react';

const delhiPipelines = [
    { id: 'IGL-N-04', pipeline: 'Narela CGS to Rohini', area: 'Rohini, Pitampura, North Delhi', pressure: 4.8, pressureNormal: [4.5, 5.2], status: 'normal', leakRisk: 12, complaints: 1, prediction: 'No risk detected — pressure stable', predConf: 97 },
    { id: 'IGL-S-11', pipeline: 'Hazrat Nizamuddin Gate Station', area: 'Lajpat Nagar, Defence Colony, South Delhi', pressure: 3.9, pressureNormal: [4.0, 5.0], status: 'warning', leakRisk: 41, complaints: 5, prediction: 'Pressure below threshold — inspect valve A-11', predConf: 82 },
    { id: 'IGL-E-07', pipeline: 'Kondli Receiving Station', area: 'Kondli, Mayur Vihar, East Delhi', pressure: 5.3, pressureNormal: [4.5, 5.2], status: 'overpressure', leakRisk: 67, complaints: 8, prediction: 'Overpressure — automatic relief valve triggered', predConf: 91 },
    { id: 'IGL-W-02', pipeline: 'Palam CGS Distribution', area: 'Dwarka, Palam, West Delhi', pressure: 4.7, pressureNormal: [4.5, 5.2], status: 'normal', leakRisk: 8, complaints: 0, prediction: 'Stable — post-maintenance checks clear', predConf: 99 },
    { id: 'IGL-C-01', pipeline: 'Central Delhi Backbone', area: 'Connaught Place, Karol Bagh, Paharganj', pressure: 4.1, pressureNormal: [4.0, 5.0], status: 'warning', leakRisk: 34, complaints: 4, prediction: 'Minor pressure drop near Karol Bagh junction', predConf: 76 },
];

const incidents = [
    { id: 'GS-2241', area: 'Mayur Vihar Ph-1', type: 'Suspected Gas Leak', status: 'On Scene', responders: 3, time: '5 min ago', critical: true },
    { id: 'GS-2238', area: 'Lajpat Nagar Market', type: 'Pressure Drop Alert', status: 'En Route', responders: 2, time: '18 min ago', critical: false },
    { id: 'GS-2235', area: 'Karol Bagh Residential', type: 'Damaged Pipeline', status: 'Dispatched', responders: 4, time: '31 min ago', critical: true },
    { id: 'GS-2230', area: 'Dwarka Sec 12', type: 'Routine Safety Check', status: 'Resolved', responders: 1, time: '1h ago', critical: false },
];

const statusCfg = {
    normal: { label: 'Normal', dot: 'bg-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    warning: { label: 'Low Pressure', dot: 'bg-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    overpressure: { label: 'Overpressure', dot: 'bg-red-400', badge: 'bg-red-500/10 text-red-400 border-red-500/20' },
};
const incidentStatus = {
    'On Scene': 'text-purple-400', 'En Route': 'text-blue-400', 'Dispatched': 'text-amber-400', 'Resolved': 'text-emerald-400',
};

const GasDepartment = () => {
    const [loading, setLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [livePressures, setLivePressures] = useState(delhiPipelines.map(p => p.pressure));

    const steps = [
        'Connecting to IGL SCADA system…',
        'Polling pipeline pressure sensors…',
        'Analysing leak probability models…',
        'Generating Delhi safety report…',
    ];

    useEffect(() => {
        let step = 0;
        const stepInterval = setInterval(() => {
            step++;
            setLoadingStep(step);
            if (step >= steps.length - 1) clearInterval(stepInterval);
        }, 650);
        const done = setTimeout(() => setLoading(false), 2800);
        return () => { clearInterval(stepInterval); clearTimeout(done); };
    }, []);

    useEffect(() => {
        if (loading) return;
        const interval = setInterval(() => {
            setLivePressures(prev => prev.map(p => parseFloat(Math.max(3.5, Math.min(5.8, p + (Math.random() - 0.5) * 0.2)).toFixed(2))));
        }, 2500);
        return () => clearInterval(interval);
    }, [loading]);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false); setLastRefresh(new Date()); }, 1600);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 border-4 border-orange-500/30 border-t-orange-400 rounded-full animate-spin mx-auto mb-6" />
                    <div className="text-white text-xl font-bold mb-1">Gas Safety Command</div>
                    <div className="text-slate-400 text-sm mb-6">IGL Pipeline Network — Delhi NCR</div>
                    <div className="space-y-2 text-left">
                        {steps.map((s, i) => (
                            <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${i <= loadingStep ? 'opacity-100' : 'opacity-20'}`}>
                                {i < loadingStep ? <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" /> :
                                    i === loadingStep ? <div className="w-3.5 h-3.5 border-2 border-orange-400/40 border-t-orange-400 rounded-full animate-spin flex-shrink-0" /> :
                                        <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex-shrink-0" />}
                                <span className={`text-sm ${i <= loadingStep ? 'text-slate-300' : 'text-slate-600'}`}>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Critical banner if overpressure */}
            {delhiPipelines.some(p => p.status === 'overpressure') && (
                <div className="bg-gradient-to-r from-red-700 to-rose-700 py-2 px-6">
                    <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm">
                        <AlertOctagon size={16} className="animate-pulse" />
                        <strong>CRITICAL:</strong> Overpressure detected on IGL-E-07 (Kondli). Auto relief valve activated. Inspector dispatched.
                        <span className="ml-auto text-red-200 animate-pulse">● LIVE</span>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                            <Flame size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg leading-none">Gas Department</h1>
                            <p className="text-slate-400 text-xs flex items-center gap-1"><MapPin size={10} />IGL Pipeline Network — Delhi NCR</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={10} />Updated: {lastRefresh.toLocaleTimeString()}</span>
                        <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm border border-white/10 transition-all">
                            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />Refresh
                        </button>
                        <span className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs border border-orange-500/20">
                            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />SCADA Live
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Pipeline Zones', value: delhiPipelines.length, sub: 'Delhi monitored', color: 'from-orange-500 to-red-600', icon: Activity },
                        { label: 'Safety Alerts', value: delhiPipelines.filter(p => p.status !== 'normal').length, sub: 'Needs attention', color: 'from-red-500 to-rose-600', icon: AlertOctagon },
                        { label: 'Active Incidents', value: incidents.filter(i => i.status !== 'Resolved').length, sub: 'Responders deployed', color: 'from-amber-500 to-orange-600', icon: Phone },
                        { label: 'Network Safety', value: `${Math.round(delhiPipelines.filter(p => p.status === 'normal').length / delhiPipelines.length * 100)}%`, sub: 'Zones clear', color: 'from-emerald-500 to-teal-600', icon: Shield },
                    ].map(({ label, value, sub, color, icon: Icon }) => (
                        <div key={label} className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                            <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3`}><Icon size={18} /></div>
                            <div className="text-3xl font-black text-white">{value}</div>
                            <div className="text-white text-sm font-semibold mt-1">{label}</div>
                            <div className="text-slate-500 text-xs">{sub}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Pipeline Zones */}
                    <div className="lg:col-span-2 space-y-3">
                        <h2 className="font-bold text-white flex items-center gap-2"><Activity size={18} className="text-orange-400" />Pipeline Zone Monitoring — Live Pressure</h2>
                        {delhiPipelines.map((zone, i) => {
                            const cfg = statusCfg[zone.status];
                            const liveP = livePressures[i];
                            const [lo, hi] = zone.pressureNormal;
                            const outOfRange = liveP < lo || liveP > hi;
                            const pPct = Math.min(100, Math.max(0, ((liveP - 3.0) / (6.0 - 3.0)) * 100));
                            return (
                                <div key={zone.id} onClick={() => setSelected(selected === zone.id ? null : zone.id)}
                                    className={`bg-slate-900 rounded-2xl border cursor-pointer transition-all hover:border-orange-500/30 ${selected === zone.id ? 'border-orange-500/60 ring-1 ring-orange-500/10' : 'border-white/5'}`}>
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
                                                    <span className="font-bold text-white">{zone.pipeline}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>{cfg.label}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-400 text-xs"><MapPin size={9} />{zone.area}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-2xl font-black ${outOfRange ? 'text-red-400' : 'text-white'}`}>{liveP} bar</div>
                                                <div className="text-slate-500 text-xs">live pressure</div>
                                            </div>
                                        </div>

                                        {/* Pressure gauge bar */}
                                        <div className="relative mb-3">
                                            <div className="w-full bg-slate-800 rounded-full h-2">
                                                <div className={`h-2 rounded-full transition-all duration-700 ${zone.status === 'normal' ? 'bg-emerald-500' : zone.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${pPct}%` }} />
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-600 mt-1">
                                                <span>3.0 bar</span><span>Normal: {lo}–{hi}</span><span>6.0 bar</span>
                                            </div>
                                        </div>

                                        {/* Leak Risk */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-slate-400 text-xs">Leak risk score</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-slate-800 rounded-full h-1.5">
                                                    <div className={`h-1.5 rounded-full ${zone.leakRisk > 50 ? 'bg-red-500' : zone.leakRisk > 25 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${zone.leakRisk}%` }} />
                                                </div>
                                                <span className={`text-xs font-bold ${zone.leakRisk > 50 ? 'text-red-400' : zone.leakRisk > 25 ? 'text-amber-400' : 'text-emerald-400'}`}>{zone.leakRisk}%</span>
                                            </div>
                                        </div>

                                        {/* AI Prediction */}
                                        <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl px-3 py-2">
                                            <Eye size={11} className="text-purple-400 flex-shrink-0" />
                                            <span className="text-slate-300 text-xs flex-1">{zone.prediction}</span>
                                            <span className="text-purple-400 text-xs font-bold">{zone.predConf}%</span>
                                        </div>

                                        {selected === zone.id && (
                                            <div className="mt-3 pt-3 border-t border-white/5">
                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Zone ID</div>
                                                        <div className="text-white font-bold text-sm font-mono">{zone.id}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Complaints</div>
                                                        <div className="text-white font-bold text-sm">{zone.complaints}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl">Dispatch Inspector</button>
                                                    <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl">Emergency Isolate</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-4">
                        {/* Active Incidents */}
                        <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Flame size={16} className="text-orange-400" />Active Incidents</h3>
                            <div className="space-y-3">
                                {incidents.map(inc => (
                                    <div key={inc.id} className={`rounded-xl p-3 border ${inc.critical ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-800 border-white/5'}`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white text-xs font-bold">{inc.id}</span>
                                                    {inc.critical && <span className="text-red-400 text-xs font-bold">● CRITICAL</span>}
                                                </div>
                                                <div className="text-slate-300 text-xs mt-0.5">{inc.type}</div>
                                                <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5"><MapPin size={9} />{inc.area} · {inc.time}</div>
                                            </div>
                                            <span className={`text-xs font-semibold ${incidentStatus[inc.status]}`}>{inc.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Safety Checklist */}
                        <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Shield size={16} className="text-emerald-400" />Safety Systems</h3>
                            {[
                                { label: 'SCADA Connectivity', ok: true },
                                { label: 'Auto Pressure Relief Valves', ok: true },
                                { label: 'Emergency Shutdown (ESD)', ok: true },
                                { label: 'Leak Detection Network', ok: true },
                                { label: 'IGL-E-07 Relief Valve', ok: false, note: 'Triggered — active' },
                            ].map(({ label, ok, note }) => (
                                <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <span className="text-slate-400 text-xs">{label}</span>
                                    <div className="text-right">
                                        <span className={`text-xs font-semibold flex items-center gap-1 ${ok && !note ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {ok && !note ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                                            {note || (ok ? 'OK' : 'Issue')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Emergency Contacts */}
                        <div className="bg-slate-900 rounded-2xl border border-orange-500/20 p-5">
                            <h3 className="font-bold text-orange-400 mb-3 flex items-center gap-2"><Phone size={16} />Emergency Contacts</h3>
                            {[
                                { role: 'IGL Control Room', num: '1800-102-4305' },
                                { role: 'Delhi Fire Brigade', num: '101' },
                                { role: 'Field Supervisor', num: '+91-98100-XXXXX' },
                            ].map(({ role, num }) => (
                                <div key={role} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                    <span className="text-slate-400 text-xs">{role}</span>
                                    <span className="text-orange-400 text-xs font-mono font-bold">{num}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GasDepartment;
