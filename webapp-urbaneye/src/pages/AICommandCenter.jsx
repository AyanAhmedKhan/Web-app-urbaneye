import { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CloudRain, Wind, Thermometer, Activity, Target, Zap, ChevronRight, RefreshCw, MapPin, Clock } from 'lucide-react';
import SmartCitySidebar from '../components/SmartCitySidebar';

const mockPredictions = [
    {
        id: 1, zone: 'Sector 12, Andheri East', type: 'Sewage Overflow',
        confidence: 87, severity: 'high', eta: '2–4 hours',
        reason: 'Heavy rainfall forecast (78mm) + 6 drainage complaints in 48h',
        department: 'Water & Sanitation', cost: '₹42,000',
        icon: '🌊', trend: '+34%'
    },
    {
        id: 2, zone: 'MG Road Corridor', type: 'Road Damage',
        confidence: 73, severity: 'medium', eta: '12–24 hours',
        reason: 'Sustained 42°C temperatures + surface cracks reported x3',
        department: 'Roads & Infrastructure', cost: '₹1,20,000',
        icon: '🚧', trend: '+18%'
    },
    {
        id: 3, zone: 'Dharavi Industrial Area', type: 'Power Fault Risk',
        confidence: 91, severity: 'high', eta: '30–60 mins',
        reason: 'Voltage fluctuation spikes detected, transformer load at 94%',
        department: 'Electricity', cost: '₹2,80,000',
        icon: '⚡', trend: '+61%'
    },
    {
        id: 4, zone: 'Bandra West Residential', type: 'Garbage Surge',
        confidence: 64, severity: 'low', eta: '24–48 hours',
        reason: 'Festival season + 12% increase in complaint volume',
        department: 'Solid Waste Management', cost: '₹18,500',
        icon: '🗑️', trend: '+12%'
    },
];

const weatherData = [
    { label: 'Temperature', value: '38°C', change: '+3°C', icon: Thermometer, color: 'text-orange-500' },
    { label: 'Rainfall', value: '78mm', change: 'Forecast', icon: CloudRain, color: 'text-blue-500' },
    { label: 'Wind Speed', value: '32 km/h', change: 'Gusting 48', icon: Wind, color: 'text-slate-500' },
    { label: 'Humidity', value: '84%', change: '+12%', icon: Activity, color: 'text-indigo-500' },
];

const historicalTrend = [
    { month: 'Sep', count: 142 }, { month: 'Oct', count: 198 },
    { month: 'Nov', count: 167 }, { month: 'Dec', count: 223 },
    { month: 'Jan', count: 189 }, { month: 'Feb', count: 241 },
];

const AICommandCenter = () => {
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [activeZone, setActiveZone] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            setLastRefresh(new Date());
        }, 1500);
    };

    const getSeverityStyle = (severity) => {
        if (severity === 'high') return { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-500', text: 'text-red-700' };
        if (severity === 'medium') return { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-500', text: 'text-amber-700' };
        return { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-500', text: 'text-green-700' };
    };

    const maxCount = Math.max(...historicalTrend.map(d => d.count));

    if (loading) {
        return (
            <SmartCitySidebar>
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6" />
                        <div className="text-white text-xl font-bold mb-2">UrbanAI Engine</div>
                        <div className="text-slate-400 text-sm">Correlating weather patterns, historical data & live reports…</div>
                        <div className="mt-4 flex gap-2 justify-center">
                            {['Fetching weather', 'Analysing incidents', 'Generating predictions'].map((s, i) => (
                                <span key={i} className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/20 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </SmartCitySidebar>
        );
    }

    return (
        <SmartCitySidebar>
            <div className="min-h-screen bg-slate-950 text-white">
                {/* Header */}
                <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Brain size={20} />
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-lg leading-none">AI Command Center</h1>
                                <p className="text-slate-400 text-xs">Predictive Infrastructure Intelligence</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock size={12} />
                                Last updated: {lastRefresh.toLocaleTimeString()}
                            </span>
                            <button
                                onClick={handleRefresh}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-all border border-white/10"
                            >
                                <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                                Refresh
                            </button>
                            <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Live
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Active Predictions', value: '4', sub: '2 critical', color: 'from-red-500 to-rose-600' },
                            { label: 'Avg Confidence', value: '78.8%', sub: 'UrbanAI Engine', color: 'from-purple-500 to-indigo-600' },
                            { label: 'Prevention Cost', value: '₹4.6L', sub: 'estimated savings', color: 'from-emerald-500 to-teal-600' },
                            { label: 'Zones Monitored', value: '142', sub: 'across 8 wards', color: 'from-amber-500 to-orange-600' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-slate-900 rounded-2xl p-5 border border-white/5">
                                <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                                <div className="text-white font-semibold mt-1 text-sm">{stat.label}</div>
                                <div className="text-slate-500 text-xs mt-1">{stat.sub}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Predictions Feed */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-white flex items-center gap-2">
                                    <Target size={18} className="text-purple-400" />
                                    Active Risk Predictions
                                </h2>
                                <span className="text-slate-500 text-xs">{mockPredictions.length} zones flagged</span>
                            </div>
                            {mockPredictions.map((pred) => {
                                const style = getSeverityStyle(pred.severity);
                                return (
                                    <div
                                        key={pred.id}
                                        onClick={() => setActiveZone(activeZone === pred.id ? null : pred.id)}
                                        className={`bg-slate-900 rounded-2xl border cursor-pointer transition-all hover:border-purple-500/40 ${activeZone === pred.id ? 'border-purple-500/60 ring-1 ring-purple-500/20' : 'border-white/5'}`}
                                    >
                                        <div className="p-5">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4">
                                                    <span className="text-3xl">{pred.icon}</span>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${style.badge}`}>
                                                                {pred.severity.toUpperCase()}
                                                            </span>
                                                            <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{pred.zone}</span>
                                                        </div>
                                                        <h3 className="font-bold text-white text-lg">{pred.type}</h3>
                                                        <p className="text-slate-400 text-sm mt-1">{pred.reason}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-white">{pred.confidence}%</div>
                                                    <div className="text-slate-500 text-xs">confidence</div>
                                                </div>
                                            </div>
                                            {activeZone === pred.id && (
                                                <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-4">
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs mb-1">Department</div>
                                                        <div className="text-white text-sm font-semibold">{pred.department}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs mb-1">Est. ETA</div>
                                                        <div className="text-white text-sm font-semibold">{pred.eta}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs mb-1">Prevention Cost</div>
                                                        <div className="text-emerald-400 text-sm font-semibold">{pred.cost}</div>
                                                    </div>
                                                    <div className="col-span-3 flex gap-2">
                                                        <button className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all">
                                                            Dispatch Team
                                                        </button>
                                                        <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold rounded-xl transition-all border border-white/10">
                                                            View on Map
                                                        </button>
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
                            {/* Weather Panel */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <CloudRain size={16} className="text-blue-400" />
                                    Live Weather Feed
                                </h3>
                                <div className="space-y-3">
                                    {weatherData.map(({ label, value, change, icon: Icon, color }) => (
                                        <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                            <div className="flex items-center gap-2">
                                                <Icon size={16} className={color} />
                                                <span className="text-slate-400 text-xs">{label}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-bold text-sm">{value}</div>
                                                <div className="text-slate-500 text-xs">{change}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Historical Trend */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <TrendingUp size={16} className="text-emerald-400" />
                                    Incident Trend (6mo)
                                </h3>
                                <div className="flex items-end gap-2 h-28">
                                    {historicalTrend.map(({ month, count }) => (
                                        <div key={month} className="flex-1 flex flex-col items-center gap-1">
                                            <div className="text-slate-500 text-xs">{count}</div>
                                            <div
                                                className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all hover:from-purple-500 hover:to-indigo-400"
                                                style={{ height: `${(count / maxCount) * 80}px` }}
                                            />
                                            <div className="text-slate-500 text-xs">{month}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* News Context */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <Zap size={16} className="text-amber-400" />
                                    Local Context Feed
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { text: 'Heavy rainfall alert issued for Mumbai suburbs', time: '2h ago', tag: 'Weather' },
                                        { text: 'Ganesh festival procession expected through Andheri West', time: '5h ago', tag: 'Events' },
                                        { text: 'Construction work underway on SV Road stretch', time: '1d ago', tag: 'Infra' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                                            <span className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded-full whitespace-nowrap">{item.tag}</span>
                                            <div>
                                                <p className="text-slate-300 text-xs leading-relaxed">{item.text}</p>
                                                <span className="text-slate-500 text-xs">{item.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SmartCitySidebar>
    );
};

export default AICommandCenter;
