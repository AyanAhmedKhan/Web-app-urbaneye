import { useState, useEffect } from 'react';
import { Zap, AlertTriangle, TrendingUp, Activity, MapPin, Clock, RefreshCw, CheckCircle, Phone, Gauge, Eye, ChevronRight } from 'lucide-react';
import SmartCitySidebar from '../components/SmartCitySidebar';

const delhiZones = [
    { id: 'DEL-N-01', feeder: 'Rohini Sub-Station', area: 'Rohini Sector 3–7, North Delhi', load: 94, status: 'overload', voltage: '198V', complaints: 14, prediction: 'Fault likely in 2–3hrs', predConf: 89 },
    { id: 'DEL-S-04', feeder: 'Okhla Industrial', area: 'Okhla Phase I & II, South Delhi', load: 78, status: 'normal', voltage: '228V', complaints: 2, prediction: 'Stable — no action needed', predConf: 96 },
    { id: 'DEL-E-09', feeder: 'Shahdara Grid', area: 'Shahdara, Preet Vihar, East Delhi', load: 87, status: 'warning', voltage: '211V', complaints: 7, prediction: 'Voltage sag probable at peak hour', predConf: 74 },
    { id: 'DEL-W-12', feeder: 'Janakpuri 220kV', area: 'Janakpuri, West Delhi', load: 62, status: 'normal', voltage: '233V', complaints: 1, prediction: 'Stable — no action needed', predConf: 98 },
    { id: 'DEL-C-02', feeder: 'Rajiv Chowk Distribution', area: 'Connaught Place, Central Delhi', load: 91, status: 'warning', voltage: '205V', complaints: 9, prediction: 'Transformer overload risk by evening', predConf: 81 },
];

const recentComplaints = [
    { id: 'EL-9820', area: 'Rohini Sec 5', type: 'Power Outage', status: 'Assigned', officer: 'R. Sharma', time: '8 min ago' },
    { id: 'EL-9817', area: 'Preet Vihar', type: 'Voltage Fluctuation', status: 'Resolved', officer: 'P. Kumar', time: '22 min ago' },
    { id: 'EL-9815', area: 'Connaught Place', type: 'Street Light Fault', status: 'En Route', officer: 'S. Verma', time: '35 min ago' },
    { id: 'EL-9810', area: 'Okhla Phase II', type: 'Exposed Wiring', status: 'On Scene', officer: 'K. Singh', time: '51 min ago' },
];

const peakHourData = [
    { hour: '6am', load: 48 }, { hour: '8am', load: 71 }, { hour: '10am', load: 83 },
    { hour: '12pm', load: 79 }, { hour: '2pm', load: 76 }, { hour: '4pm', load: 85 },
    { hour: '6pm', load: 94 }, { hour: '8pm', load: 91 }, { hour: '10pm', load: 67 },
];

const statusCfg = {
    normal: { label: 'Normal', dot: 'bg-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', bar: 'bg-emerald-500' },
    warning: { label: 'Warning', dot: 'bg-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', bar: 'bg-amber-500' },
    overload: { label: 'Overload', dot: 'bg-red-400', badge: 'bg-red-500/10 text-red-400 border-red-500/20', bar: 'bg-red-500' },
};
const complaintStatus = {
    Assigned: 'text-amber-400', Resolved: 'text-emerald-400', 'En Route': 'text-blue-400', 'On Scene': 'text-purple-400',
};

const ElectricityDepartment = () => {
    const [loading, setLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [liveLoads, setLiveLoads] = useState(delhiZones.map(z => z.load));

    const steps = ['Connecting to BSES/TPDDL grid APIs…', 'Loading feeder-level telemetry…', 'Running predictive fault models…', 'Generating Delhi zone report…'];

    useEffect(() => {
        let step = 0;
        const stepInterval = setInterval(() => {
            step++;
            setLoadingStep(step);
            if (step >= steps.length - 1) clearInterval(stepInterval);
        }, 600);
        const doneTimer = setTimeout(() => setLoading(false), 2600);
        return () => { clearInterval(stepInterval); clearTimeout(doneTimer); };
    }, []);

    // Simulate live load fluctuations
    useEffect(() => {
        if (loading) return;
        const interval = setInterval(() => {
            setLiveLoads(prev => prev.map(l => Math.min(100, Math.max(50, l + (Math.random() - 0.48) * 3))));
        }, 2000);
        return () => clearInterval(interval);
    }, [loading]);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false); setLastRefresh(new Date()); }, 1600);
    };

    if (loading) {
        return (
            <SmartCitySidebar>
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-6" />
                        <div className="text-white text-xl font-bold mb-1">Electricity Command</div>
                        <div className="text-slate-400 text-sm mb-6">Delhi NCR Grid — UrbanAI Engine</div>
                        <div className="space-y-2 text-left">
                            {steps.map((s, i) => (
                                <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${i <= loadingStep ? 'opacity-100' : 'opacity-20'}`}>
                                    {i < loadingStep ? <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" /> :
                                        i === loadingStep ? <div className="w-3.5 h-3.5 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin flex-shrink-0" /> :
                                            <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex-shrink-0" />}
                                    <span className={`text-sm ${i <= loadingStep ? 'text-slate-300' : 'text-slate-600'}`}>{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SmartCitySidebar>
        );
    }

    const maxLoad = Math.max(...peakHourData.map(d => d.load));

    return (
        <SmartCitySidebar>
            <div className="min-h-screen bg-slate-950 text-white">
                {/* Header */}
                <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-lg leading-none">Electricity Department</h1>
                                <p className="text-slate-400 text-xs flex items-center gap-1"><MapPin size={10} />Delhi NCR — BSES Rajdhani & TPDDL Grid</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={10} />Updated: {lastRefresh.toLocaleTimeString()}</span>
                            <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm border border-white/10 transition-all">
                                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />Refresh
                            </button>
                            <span className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs border border-amber-500/20">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />Live Grid
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Active Feeders', value: '5', sub: 'Delhi zones', color: 'from-amber-500 to-yellow-600', icon: Zap },
                            { label: 'Overload Alerts', value: delhiZones.filter(z => z.status === 'overload').length, sub: 'Needs dispatch', color: 'from-red-500 to-rose-600', icon: AlertTriangle },
                            { label: 'Active Complaints', value: recentComplaints.filter(c => c.status !== 'Resolved').length, sub: 'Being handled', color: 'from-blue-500 to-indigo-600', icon: Phone },
                            { label: 'Avg Grid Load', value: `${Math.round(liveLoads.reduce((a, b) => a + b, 0) / liveLoads.length)}%`, sub: 'Real-time', color: 'from-purple-500 to-violet-600', icon: Gauge },
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
                        {/* Feeder Zone Cards */}
                        <div className="lg:col-span-2 space-y-3">
                            <h2 className="font-bold text-white flex items-center gap-2"><Activity size={18} className="text-amber-400" />Delhi Feeder Zones — Live Status</h2>
                            {delhiZones.map((zone, i) => {
                                const cfg = statusCfg[zone.status];
                                const liveLoad = Math.round(liveLoads[i]);
                                return (
                                    <div key={zone.id} onClick={() => setSelected(selected === zone.id ? null : zone.id)}
                                        className={`bg-slate-900 rounded-2xl border cursor-pointer transition-all hover:border-amber-500/30 ${selected === zone.id ? 'border-amber-500/60 ring-1 ring-amber-500/10' : 'border-white/5'}`}>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
                                                        <span className="font-bold text-white">{zone.feeder}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.badge}`}>{cfg.label}</span>
                                                        <span className="text-xs text-slate-500">{zone.id}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-slate-400 text-xs"><MapPin size={9} />{zone.area}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-white">{liveLoad}%</div>
                                                    <div className="text-slate-500 text-xs">grid load</div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                                                <div className={`h-2 rounded-full transition-all duration-700 ${cfg.bar}`} style={{ width: `${liveLoad}%` }} />
                                            </div>
                                            {/* AI Prediction Band */}
                                            <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl px-3 py-2">
                                                <div className="w-5 h-5 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Eye size={11} className="text-purple-400" />
                                                </div>
                                                <span className="text-slate-300 text-xs flex-1">{zone.prediction}</span>
                                                <span className="text-purple-400 text-xs font-bold">{zone.predConf}%</span>
                                            </div>

                                            {selected === zone.id && (
                                                <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-3">
                                                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                                                        <div className="text-slate-400 text-xs">Voltage</div>
                                                        <div className={`font-bold text-sm ${parseFloat(zone.voltage) < 210 ? 'text-amber-400' : 'text-emerald-400'}`}>{zone.voltage}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                                                        <div className="text-slate-400 text-xs">Complaints</div>
                                                        <div className="text-white font-bold text-sm">{zone.complaints}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                                                        <div className="text-slate-400 text-xs">AI Confidence</div>
                                                        <div className="text-purple-400 font-bold text-sm">{zone.predConf}%</div>
                                                    </div>
                                                    <div className="col-span-3 flex gap-2 mt-1">
                                                        <button className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl">Dispatch Team</button>
                                                        <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl">View Complaints</button>
                                                        <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-bold rounded-xl">Map View</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right side */}
                        <div className="space-y-4">
                            {/* Peak Load Chart */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-amber-400" />Today's Load Profile</h3>
                                <div className="flex items-end gap-1.5 h-24">
                                    {peakHourData.map(({ hour, load }) => (
                                        <div key={hour} className="flex-1 flex flex-col items-center gap-1">
                                            <div className={`w-full rounded-t-md transition-all ${load >= 90 ? 'bg-red-500' : load >= 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                                style={{ height: `${(load / maxLoad) * 80}px` }} />
                                            <div className="text-slate-600 text-xs">{hour}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 mt-3 text-xs">
                                    <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 bg-emerald-500 rounded-full" />Normal</span>
                                    <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 bg-amber-500 rounded-full" />Warning</span>
                                    <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 bg-red-500 rounded-full" />Overload</span>
                                </div>
                            </div>

                            {/* Recent Complaints */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Phone size={16} className="text-blue-400" />Recent Complaints</h3>
                                <div className="space-y-3">
                                    {recentComplaints.map(c => (
                                        <div key={c.id} className="flex items-start justify-between gap-2 py-2 border-b border-white/5 last:border-0">
                                            <div>
                                                <div className="text-white text-xs font-bold">{c.id} · {c.type}</div>
                                                <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5"><MapPin size={9} />{c.area}</div>
                                                <div className="text-slate-600 text-xs mt-0.5">{c.officer} · {c.time}</div>
                                            </div>
                                            <span className={`text-xs font-semibold whitespace-nowrap ${complaintStatus[c.status]}`}>{c.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Theft Monitor */}
                            <div className="bg-slate-900 rounded-2xl border border-amber-500/20 p-5">
                                <h3 className="font-bold text-amber-400 mb-3 flex items-center gap-2"><AlertTriangle size={16} />Theft Monitor</h3>
                                {[
                                    { area: 'Shahdara DP-7', gap: '31%', risk: 'High' },
                                    { area: 'Rohini Sec 11 DP-3', gap: '18%', risk: 'Medium' },
                                ].map(({ area, gap, risk }) => (
                                    <div key={area} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                        <div>
                                            <div className="text-white text-xs font-semibold">{area}</div>
                                            <div className="text-slate-500 text-xs">Supply–billing gap: {gap}</div>
                                        </div>
                                        <span className={`text-xs font-bold ${risk === 'High' ? 'text-red-400' : 'text-amber-400'}`}>{risk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SmartCitySidebar>
    );
};

export default ElectricityDepartment;
