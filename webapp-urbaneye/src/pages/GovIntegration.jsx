import { useState } from 'react';
import { Building2, Link2, ShieldCheck, Globe, CheckCircle, AlertTriangle, ChevronRight, ArrowRight, Activity, Clock, RefreshCw } from 'lucide-react';
import SmartCitySidebar from '../components/SmartCitySidebar';

const integrations = [
    { id: 'erp', name: 'Municipal ERP System', vendor: 'NIC MunSoft', status: 'connected', uptime: '99.8%', lastSync: '2 min ago', dataPoints: '14,820', icon: '🏛️', endpoint: '/api/erp/v2' },
    { id: 'iccc', name: 'Smart City Command Center', vendor: 'ICCC Platform', status: 'connected', uptime: '99.4%', lastSync: '45 sec ago', dataPoints: '8,344', icon: '🏙️', endpoint: '/api/iccc/live' },
    { id: 'nic', name: 'NIC MeghRaj Cloud', vendor: 'NIC India', status: 'connected', uptime: '100%', lastSync: '1 min ago', dataPoints: '2,100', icon: '☁️', endpoint: 'nic.niccloud.in/v1' },
    { id: 'aadhaar', name: 'Aadhaar-Alt Auth Layer', vendor: 'UrbanEye Auth', status: 'connected', uptime: '99.9%', lastSync: 'Active', dataPoints: '3,210 sessions', icon: '🔐', endpoint: '/api/auth/alternate' },
    { id: 'weather', name: 'India Meteorological Dept', vendor: 'IMD API', status: 'connected', uptime: '97.2%', lastSync: '10 min ago', dataPoints: '480 readings', icon: '🌦️', endpoint: 'imdapi.gov.in/live' },
    { id: 'fire', name: 'Fire Department NOC', vendor: 'Maharashtra Fire', status: 'pending', uptime: '—', lastSync: 'Awaiting approval', dataPoints: '—', icon: '🚒', endpoint: 'Pending' },
];

const dataFlows = [
    { from: 'Citizen App', to: 'UrbanEye Backend', protocol: 'REST/HTTPS', volume: '2,400 req/hr' },
    { from: 'Smart Meters', to: 'Meter Analytics Engine', protocol: 'MQTT', volume: '12,000 msg/hr' },
    { from: 'UrbanEye Backend', to: 'NIC MeghRaj Cloud', protocol: 'HTTPS/S3', volume: '180 MB/hr' },
    { from: 'ICCC Platform', to: 'UrbanEye Dashboard', protocol: 'WebSocket', volume: 'Real-time stream' },
    { from: 'IMD Weather API', to: 'AI Command Center', protocol: 'REST', volume: '48 calls/hr' },
];

const GovIntegration = () => {
    const [selected, setSelected] = useState(null);
    const [testing, setTesting] = useState(null);
    const [testResult, setTestResult] = useState({});

    const handleTest = (id) => {
        setTesting(id);
        setTimeout(() => {
            setTesting(null);
            setTestResult(prev => ({ ...prev, [id]: 'ok' }));
            setTimeout(() => setTestResult(prev => { const n = { ...prev }; delete n[id]; return n; }), 3000);
        }, 1800);
    };

    const connected = integrations.filter(i => i.status === 'connected').length;

    return (
        <SmartCitySidebar>
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Link2 size={20} />
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-lg leading-none">Government Integration Layer</h1>
                                <p className="text-slate-400 text-xs">ERP, ICCC, NIC Cloud & Authentication Bridges</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20">
                                <ShieldCheck size={12} />MeitY Empanelment Ready
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs border border-indigo-500/20">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                {connected}/{integrations.length} Connected
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Integrations Live', value: `${connected}/${integrations.length}`, color: 'from-indigo-500 to-blue-600', icon: Link2 },
                            { label: 'Avg Uptime', value: '99.3%', color: 'from-emerald-500 to-teal-600', icon: Activity },
                            { label: 'Data Synced Today', value: '2.4 GB', color: 'from-purple-500 to-violet-600', icon: Globe },
                            { label: 'Security Level', value: 'TLS 1.3', color: 'from-amber-500 to-orange-600', icon: ShieldCheck },
                        ].map(({ label, value, color, icon: Icon }) => (
                            <div key={label} className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3`}><Icon size={18} /></div>
                                <div className="text-3xl font-black text-white">{value}</div>
                                <div className="text-slate-400 text-xs mt-1">{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Integration Cards */}
                        <div className="lg:col-span-2 space-y-3">
                            <h2 className="font-bold text-white mb-2 flex items-center gap-2">
                                <Building2 size={18} className="text-indigo-400" />Government System Connections
                            </h2>
                            {integrations.map(intg => {
                                const isConnected = intg.status === 'connected';
                                return (
                                    <div key={intg.id}
                                        onClick={() => setSelected(selected === intg.id ? null : intg.id)}
                                        className={`bg-slate-900 rounded-2xl border cursor-pointer transition-all hover:border-indigo-500/40 ${selected === intg.id ? 'border-indigo-500/60' : 'border-white/5'}`}>
                                        <div className="p-5 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl">{intg.icon}</span>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-white">{intg.name}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                            {isConnected ? '● Connected' : '⏳ Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="text-slate-400 text-xs flex items-center gap-3">
                                                        <span>{intg.vendor}</span>
                                                        <span className="text-slate-600">·</span>
                                                        <span className="font-mono text-indigo-400/70">{intg.endpoint}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-white font-bold text-sm">{intg.uptime}</div>
                                                <div className="text-slate-500 text-xs flex items-center gap-1 justify-end mt-1"><Clock size={9} />{intg.lastSync}</div>
                                            </div>
                                        </div>
                                        {selected === intg.id && (
                                            <div className="border-t border-white/5 p-4">
                                                <div className="grid grid-cols-3 gap-3 mb-3">
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Uptime</div>
                                                        <div className="text-emerald-400 font-bold">{intg.uptime}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Data Points</div>
                                                        <div className="text-white font-bold text-sm">{intg.dataPoints}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3">
                                                        <div className="text-slate-400 text-xs">Last Sync</div>
                                                        <div className="text-blue-400 font-bold text-sm">{intg.lastSync}</div>
                                                    </div>
                                                </div>
                                                {isConnected && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleTest(intg.id); }}
                                                        className="w-full py-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all"
                                                        disabled={!!testing}
                                                    >
                                                        {testing === intg.id ? (
                                                            <><RefreshCw size={14} className="animate-spin" />Testing connection…</>
                                                        ) : testResult[intg.id] === 'ok' ? (
                                                            <><CheckCircle size={14} />Connection Healthy — 42ms</>
                                                        ) : (
                                                            <>Test Connection<ChevronRight size={14} /></>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-4">
                            {/* Data Flow Diagram */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <ArrowRight size={16} className="text-blue-400" />Live Data Flows
                                </h3>
                                <div className="space-y-3">
                                    {dataFlows.map(({ from, to, protocol, volume }) => (
                                        <div key={from} className="rounded-xl bg-slate-800 p-3">
                                            <div className="flex items-center justify-between text-xs mb-2">
                                                <span className="text-slate-300 font-semibold">{from}</span>
                                                <ArrowRight size={10} className="text-slate-500 mx-1 flex-shrink-0" />
                                                <span className="text-slate-300 font-semibold text-right">{to}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-indigo-400 text-xs font-mono">{protocol}</span>
                                                <span className="text-emerald-400 text-xs">{volume}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Compliance Panel */}
                            <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-emerald-400" />Compliance Status
                                </h3>
                                {[
                                    { label: 'GIGW 2.0', status: 'Compliant', ok: true },
                                    { label: 'DPDPA 2023', status: 'Compliant', ok: true },
                                    { label: 'MeitY Empanelment', status: 'Ready', ok: true },
                                    { label: 'NIC Security Audit', status: 'Scheduled Q2', ok: false },
                                    { label: 'ISO 27001 Alignment', status: 'In Progress', ok: false },
                                ].map(({ label, status, ok }) => (
                                    <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                        <span className="text-slate-400 text-xs">{label}</span>
                                        <span className={`text-xs font-semibold flex items-center gap-1 ${ok ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {ok ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}{status}
                                        </span>
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

export default GovIntegration;
