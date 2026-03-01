import { useState, useEffect } from 'react';
import { Wifi, Server, MapPin, Activity, Sun, Wind, Trash2, Camera, Radio, CheckCircle, AlertTriangle, Clock, RefreshCw } from 'lucide-react';

const devices = [
    { id: 'SCN-001', name: 'Smart Streetlight', zone: 'MG Road – Pole #14', protocol: 'MQTT', status: 'online', battery: 92, signal: -62, type: 'streetlight', lastPing: '12s ago' },
    { id: 'AQS-204', name: 'Air Quality Sensor', zone: 'Dharavi Industrial', protocol: 'MQTT', status: 'online', battery: 78, signal: -71, type: 'air', lastPing: '8s ago' },
    { id: 'WBM-088', name: 'Waste Bin Monitor', zone: 'Bandra Station Market', protocol: 'NB-IoT', status: 'online', battery: 45, signal: -80, type: 'waste', lastPing: '35s ago' },
    { id: 'FLS-019', name: 'Flood Level Sensor', zone: 'Mithi River – Checkpoint A', protocol: 'LoRaWAN', status: 'warning', battery: 23, signal: -88, type: 'flood', lastPing: '2m ago' },
    { id: 'TFC-337', name: 'Traffic Camera', zone: 'Western Express Hwy – KM 14', protocol: 'REST/HTTP', status: 'online', battery: null, signal: -55, type: 'camera', lastPing: '3s ago' },
    { id: 'PRM-102', name: 'Parking Sensor Array', zone: 'BKC Pod Zone', protocol: 'CoAP', status: 'offline', battery: 0, signal: null, type: 'parking', lastPing: '4h ago' },
];

const typeIcon = { streetlight: Sun, air: Wind, waste: Trash2, flood: Activity, camera: Camera, parking: Radio };
const typeColor = { streetlight: 'text-yellow-400', air: 'text-blue-400', waste: 'text-emerald-400', flood: 'text-cyan-400', camera: 'text-purple-400', parking: 'text-slate-400' };
const typeBg = { streetlight: 'from-yellow-500 to-amber-600', air: 'from-blue-500 to-cyan-600', waste: 'from-emerald-500 to-teal-600', flood: 'from-cyan-500 to-blue-600', camera: 'from-purple-500 to-violet-600', parking: 'from-slate-500 to-slate-700' };

const SmartCityDevices = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [filter, setFilter] = useState('all');
    const [refreshing, setRefreshing] = useState(false);
    const [pingIds, setPingIds] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const onlineDevices = devices.filter(d => d.status === 'online');
            if (onlineDevices.length > 0) {
                const id = onlineDevices[Math.floor(Math.random() * onlineDevices.length)].id;
                setPingIds(prev => [...prev, id]);
                setTimeout(() => setPingIds(prev => prev.filter(x => x !== id)), 1000);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const filtered = filter === 'all' ? devices : devices.filter(d => d.status === filter);
    const online = devices.filter(d => d.status === 'online').length;
    const warning = devices.filter(d => d.status === 'warning').length;
    const offline = devices.filter(d => d.status === 'offline').length;

    const protocolColors = { MQTT: 'text-indigo-400 bg-indigo-500/10', 'NB-IoT': 'text-blue-400 bg-blue-500/10', LoRaWAN: 'text-purple-400 bg-purple-500/10', 'REST/HTTP': 'text-emerald-400 bg-emerald-500/10', CoAP: 'text-amber-400 bg-amber-500/10' };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <Wifi size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg leading-none">Smart City Device Registry</h1>
                            <p className="text-slate-400 text-xs">Live IoT Infrastructure Monitor</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1200); }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm border border-white/10 transition-all">
                            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                            Ping All
                        </button>
                        <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            {online}/{devices.length} Online
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                    {[
                        { label: 'Total Devices', value: devices.length, color: 'text-white' },
                        { label: 'Online', value: online, color: 'text-emerald-400' },
                        { label: 'Warning', value: warning, color: 'text-amber-400' },
                        { label: 'Offline', value: offline, color: 'text-red-400' },
                        { label: 'Protocols', value: 5, color: 'text-indigo-400' },
                        { label: 'Avg Signal', value: '-71dBm', color: 'text-blue-400' },
                    ].map(({ label, value, color }) => (
                        <div key={label} className="bg-slate-900 rounded-xl border border-white/5 p-4 text-center">
                            <div className={`text-2xl font-black ${color}`}>{value}</div>
                            <div className="text-slate-500 text-xs mt-1">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Protocol Legend */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-slate-500 text-xs self-center">Protocols:</span>
                    {Object.entries(protocolColors).map(([protocol, cls]) => (
                        <span key={protocol} className={`text-xs px-3 py-1 rounded-full font-semibold border border-white/10 ${cls}`}>{protocol}</span>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Device List */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-white">Connected Devices</h2>
                            <div className="flex gap-2">
                                {['all', 'online', 'warning', 'offline'].map(f => (
                                    <button key={f} onClick={() => setFilter(f)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${filter === f ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            {filtered.map(device => {
                                const Icon = typeIcon[device.type];
                                const isPinging = pingIds.includes(device.id);
                                const statusColors = { online: 'bg-emerald-400', warning: 'bg-amber-400', offline: 'bg-red-400' };
                                const protoClass = protocolColors[device.protocol] || 'text-slate-400 bg-slate-500/10';
                                return (
                                    <div key={device.id}
                                        onClick={() => setSelectedDevice(selectedDevice === device.id ? null : device.id)}
                                        className={`bg-slate-900 rounded-2xl border cursor-pointer transition-all hover:border-cyan-500/30 ${selectedDevice === device.id ? 'border-cyan-500/50' : 'border-white/5'} ${isPinging ? 'ring-1 ring-cyan-400/30' : ''}`}>
                                        <div className="p-4 flex items-center gap-4">
                                            <div className="relative flex-shrink-0">
                                                <div className={`w-12 h-12 bg-gradient-to-br ${typeBg[device.type]} rounded-xl flex items-center justify-center`}>
                                                    <Icon size={20} className="text-white" />
                                                </div>
                                                <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${statusColors[device.status]} ${isPinging ? 'animate-ping' : ''}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-white font-bold text-sm">{device.name}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${protoClass}`}>{device.protocol}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                                                    <span className="flex items-center gap-1"><MapPin size={9} />{device.zone}</span>
                                                    <span className="flex items-center gap-1"><Clock size={9} />{device.lastPing}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-slate-500">{device.id}</div>
                                                {device.signal && <div className="text-xs text-blue-400 mt-1">{device.signal}dBm</div>}
                                                {device.battery !== null && (
                                                    <div className={`text-xs font-semibold mt-0.5 ${device.battery > 50 ? 'text-emerald-400' : device.battery > 20 ? 'text-amber-400' : 'text-red-400'}`}>
                                                        🔋{device.battery}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {selectedDevice === device.id && (
                                            <div className="border-t border-white/5 p-4">
                                                <div className="grid grid-cols-3 gap-3 mb-3">
                                                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                                                        <div className="text-slate-400 text-xs">Status</div>
                                                        <div className={`text-sm font-bold capitalize ${statusColors[device.status].replace('bg-', 'text-').replace('-400', '-300')}`}>{device.status}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                                                        <div className="text-slate-400 text-xs">Protocol</div>
                                                        <div className="text-white text-sm font-bold">{device.protocol}</div>
                                                    </div>
                                                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                                                        <div className="text-slate-400 text-xs">Signal</div>
                                                        <div className="text-blue-400 text-sm font-bold">{device.signal ? `${device.signal}dBm` : 'N/A'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold rounded-xl">Ping Device</button>
                                                    {device.status !== 'online' && (
                                                        <button className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl">Send Alert</button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-4">
                        <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Server size={16} className="text-indigo-400" />Network Overview</h3>
                            {[
                                { label: 'MQTT Broker', value: 'Connected', ok: true },
                                { label: 'LoRaWAN Gateway', value: 'Online (3 hops)', ok: true },
                                { label: 'NB-IoT Network', value: 'Airtel – 4G', ok: true },
                                { label: 'CoAP Server', value: 'Degraded', ok: false },
                                { label: 'ICCC Sync', value: 'Live Feed Active', ok: true },
                            ].map(({ label, value, ok }) => (
                                <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <span className="text-slate-400 text-xs">{label}</span>
                                    <span className={`text-xs font-semibold flex items-center gap-1 ${ok ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {ok ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}{value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 rounded-2xl border border-white/5 p-5">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Activity size={16} className="text-emerald-400" />Live Telemetry</h3>
                            {[
                                { device: 'AQS-204', metric: 'PM2.5', value: '68 µg/m³', alert: true },
                                { device: 'WBM-088', metric: 'Bin Fill', value: '78%', alert: true },
                                { device: 'FLS-019', metric: 'Water Lvl', value: '0.42m', alert: false },
                                { device: 'SCN-001', metric: 'Power Draw', value: '42W', alert: false },
                            ].map(({ device, metric, value, alert }) => (
                                <div key={device} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <div>
                                        <div className="text-white text-xs font-semibold">{device}</div>
                                        <div className="text-slate-500 text-xs">{metric}</div>
                                    </div>
                                    <span className={`text-xs font-bold ${alert ? 'text-amber-400' : 'text-emerald-400'}`}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartCityDevices;
