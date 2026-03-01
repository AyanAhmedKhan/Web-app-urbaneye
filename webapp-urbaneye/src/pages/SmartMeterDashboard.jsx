import { useState, useEffect } from 'react';
import { Zap, AlertTriangle, TrendingDown, Activity, Gauge, MapPin, ChevronRight, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import SmartCitySidebar from '../components/SmartCitySidebar';

const meters = [
    { id: 'SM-1042', zone: 'Andheri East – Block C', supplied: 1240, billed: 890, status: 'anomaly', consumption: 78, lastSync: '2 min ago' },
    { id: 'SM-2187', zone: 'Dharavi Industrial', supplied: 4800, billed: 4610, status: 'normal', consumption: 96, lastSync: '1 min ago' },
    { id: 'SM-3391', zone: 'Bandra West Residential', supplied: 620, billed: 402, status: 'theft_risk', consumption: 65, lastSync: '45 sec ago' },
    { id: 'SM-4056', zone: 'Kurla Market', supplied: 2100, billed: 1980, status: 'normal', consumption: 94, lastSync: '3 min ago' },
    { id: 'SM-5209', zone: 'Goregaon Link Road', supplied: 880, billed: 540, status: 'anomaly', consumption: 61, lastSync: '5 min ago' },
    { id: 'SM-6773', zone: 'Powai IT Park', supplied: 6400, billed: 6320, status: 'normal', consumption: 99, lastSync: '30 sec ago' },
];

const statusConfig = {
    normal: { label: 'Normal', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
    anomaly: { label: 'Anomaly', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' },
    theft_risk: { label: 'Theft Risk', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400' },
};

const SmartMeterDashboard = () => {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('all');
    const [refreshing, setRefreshing] = useState(false);
    const [pulseIds, setPulseIds] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomId = meters[Math.floor(Math.random() * meters.length)].id;
            setPulseIds(prev => [...prev, randomId]);
            setTimeout(() => setPulseIds(prev => prev.filter(id => id !== randomId)), 900);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const filtered = filter === 'all' ? meters : meters.filter(m => m.status === filter);
    const anomalyCount = meters.filter(m => m.status === 'anomaly').length;
    const theftCount = meters.filter(m => m.status === 'theft_risk').length;
    const selectedMeter = meters.find(m => m.id === selected);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1400);
    };

    return (
        <SmartCitySidebar>
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <Gauge size={20} />
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-lg leading-none">Smart Meter Dashboard</h1>
                                <p className="text-slate-400 text-xs">Energy Anomaly Detection & Monitoring</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-all border border-white/10">
                                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                                Sync All
                            </button>
                            <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                {meters.length} Meters Active
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Meters', value: meters.length, icon: Gauge, color: 'from-blue-500 to-indigo-600', sub: '6 zones covered' },
                            { label: 'Anomaly Alerts', value: anomalyCount, icon: AlertTriangle, color: 'from-amber-500 to-orange-600', sub: 'Needs review' },
                            { label: 'Theft Risk Flags', value: theftCount, icon: TrendingDown, color: 'from-red-500 to-rose-600', sub: 'Dispatch required' },
                            { label: 'Avg Efficiency', value: '82%', icon: Activity, color: 'from-emerald-500 to-teal-600', sub: 'Supply vs. billed' },
                        ].map(({ label, value, icon: Icon, color, sub }) => (
                            <div key={label} className="bg-slate-900 rounded-2xl p-5 border border-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                                        <Icon size={18} />
                                    </div>
                                    <Zap size={12} className="text-slate-600" />
                                </div>
                                <div className="text-3xl font-black text-white">{value}</div>
                                <div className="text-white text-sm font-semibold mt-1">{label}</div>
                                <div className="text-slate-500 text-xs">{sub}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Meter List */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-white">Distribution Points</h2>
                                <div className="flex gap-2">
                                    {['all', 'normal', 'anomaly', 'theft_risk'].map(f => (
                                        <button key={f} onClick={() => setFilter(f)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${filter === f ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                                            {f === 'all' ? 'All' : f === 'theft_risk' ? 'Theft Risk' : f.charAt(0).toUpperCase() + f.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                {filtered.map(meter => {
                                    const cfg = statusConfig[meter.status];
                                    const isPulsing = pulseIds.includes(meter.id);
                                    const gap = meter.supplied - meter.billed;
                                    const gapPct = ((gap / meter.supplied) * 100).toFixed(1);
                                    return (
                                        <div key={meter.id} onClick={() => setSelected(selected === meter.id ? null : meter.id)}
                                            className={`bg-slate-900 rounded-2xl border cursor-pointer transition-all hover:border-amber-500/30 ${selected === meter.id ? 'border-amber-500/50' : 'border-white/5'} ${isPulsing ? 'ring-1 ring-blue-500/30' : ''}`}>
                                            <div className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg} border ${cfg.border}`}>
                                                            <Zap size={18} className={cfg.color} />
                                                        </div>
                                                        <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${cfg.dot} ${isPulsing ? 'animate-ping' : ''}`} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-white text-sm">{meter.id}</span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>{cfg.label}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                                                            <MapPin size={10} />{meter.zone}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-white font-bold">{meter.consumption}%</div>
                                                    <div className="text-slate-500 text-xs">efficiency</div>
                                                    {meter.status !== 'normal' && (
                                                        <div className="text-red-400 text-xs font-semibold mt-1">-{gapPct}% gap</div>
                                                    )}
                                                </div>
                                            </div>
                                            {selected === meter.id && (
                                                <div className="border-t border-white/5 p-4 grid grid-cols-3 gap-3">
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Supplied</div>
                                                        <div className="text-white font-bold">{meter.supplied} kWh</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Billed</div>
                                                        <div className="text-white font-bold">{meter.billed} kWh</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Last Synced</div>
                                                        <div className="text-blue-400 font-bold text-sm">{meter.lastSync}</div>
                                                    </div>
                                                    <div className="col-span-3">
                                                        <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                                                            <div className={`h-2 rounded-full transition-all ${meter.status === 'normal' ? 'bg-emerald-500' : meter.status === 'anomaly' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${meter.consumption}%` }} />
                                                        </div>
                                                        <div className="flex justify-between text-xs text-slate-500"><span>0 kWh</span><span>{meter.supplied} kWh max</span></div>
                                                    </div>
                                                    {meter.status !== 'normal' && (
                                                        <div className="col-span-3 flex gap-2">
                                                            <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all">
                                                                Flag for Investigation
                                                            </button>
                                                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold rounded-xl border border-white/10">
                                                                Dispatch Inspector
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Side Panel */}
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <AlertTriangle size={16} className="text-red-400" />Alert Log
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { meter: 'SM-3391', event: 'Supply–billing gap exceeded 35% threshold', time: '3 min ago', level: 'red' },
                                        { meter: 'SM-1042', event: 'Unusual off-peak consumption spike detected', time: '18 min ago', level: 'amber' },
                                        { meter: 'SM-5209', event: 'Meter tamper flag from field sensor', time: '42 min ago', level: 'red' },
                                        { meter: 'SM-2187', event: 'Routine sync completed successfully', time: '1h ago', level: 'green' },
                                    ].map((alert, i) => (
                                        <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                                            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.level === 'red' ? 'bg-red-400' : alert.level === 'amber' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                            <div>
                                                <div className="text-white text-xs font-semibold">{alert.meter}</div>
                                                <div className="text-slate-400 text-xs">{alert.event}</div>
                                                <div className="text-slate-600 text-xs flex items-center gap-1 mt-0.5"><Clock size={9} />{alert.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle size={16} className="text-emerald-400" />System Health
                                </h3>
                                {[
                                    { label: 'API Sync Status', status: 'Connected', ok: true },
                                    { label: 'Meter Firmware', status: 'v3.2.1 (Current)', ok: true },
                                    { label: 'Alert Engine', status: 'Running', ok: true },
                                    { label: 'SM-5209 Signal', status: 'Weak (−78dBm)', ok: false },
                                ].map(({ label, status, ok }) => (
                                    <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                        <span className="text-slate-400 text-xs">{label}</span>
                                        <span className={`text-xs font-semibold ${ok ? 'text-emerald-400' : 'text-amber-400'}`}>{status}</span>
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

export default SmartMeterDashboard;
