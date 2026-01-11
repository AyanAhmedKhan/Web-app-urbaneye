import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Activity, Map, Upload, Sparkles, Shield, Users, Trophy, Star, ChevronRight, Play, CheckCircle, Zap, Building, MapPin } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import axios from 'axios';
import { ContainerScroll } from '../components/ui/ContainerScrollAnimation';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000/api/v1';


const Home = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);
    const [stats, setStats] = useState({ totalReports: 1240, resolvedReports: 890, activeUsers: 350 });
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const leaderboardRef = useRef(null);
    const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
    const isLeaderboardInView = useInView(leaderboardRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        fetchLeaderboard();
        fetchStats();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const res = await axios.get(`${API_BASE}/reports/leaderboard`);
            if (res.data.success) {
                setLeaderboard(res.data.leaderboard.slice(0, 5));
            }
        } catch (err) {
            // Use mock data if API fails
            setLeaderboard([
                { rank: 1, name: 'Aarav Sharma', xp: 125, report_count: 25 },
                { rank: 2, name: 'Priya Verma', xp: 100, report_count: 20 },
                { rank: 3, name: 'Vikram Singh', xp: 85, report_count: 17 },
                { rank: 4, name: 'Ananya Gupta', xp: 70, report_count: 14 },
                { rank: 5, name: 'Rahul Kumar', xp: 55, report_count: 11 },
            ]);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_BASE}/reports`);
            if (res.data.reports) {
                const reports = res.data.reports;
                setStats({
                    totalReports: reports.length,
                    resolvedReports: reports.filter(r => r.status === 'resolved').length,
                    activeUsers: 350
                });
            }
        } catch (err) {
            console.log('Using default stats');
        }
    };

    // Helper to get correct dashboard route based on role
    const getDashboardRoute = () => {
        if (!isAuthenticated() || !user) return '/login';
        switch (user.role) {
            case 'super_admin': return '/super-admin-dashboard';
            case 'gov_admin': return '/gov-admin-dashboard';
            case 'dept_head': return '/dept-head-dashboard';
            case 'field_officer': return '/field-officer-dashboard';
            case 'civilian': return '/dashboard';
            case 'gig_worker': return '/dashboard';
            case 'social_worker': return '/dashboard';
            default: return '/dashboard';
        }
    };

    const features = [
        {
            icon: Upload,
            title: "AI-Powered Detection",
            description: "Upload any image and our Gemini-powered AI instantly identifies civic issues like potholes, garbage, and broken streetlights.",
            color: "from-blue-500 to-indigo-600"
        },
        {
            icon: MapPin,
            title: "Real-time Tracking",
            description: "Every report is geo-tagged and tracked in real-time. Watch as issues move from reported to resolved.",
            color: "from-emerald-500 to-teal-600"
        },
        {
            icon: Building,
            title: "Department Routing",
            description: "Issues are automatically routed to the correct government department based on AI classification.",
            color: "from-purple-500 to-pink-600"
        },
        {
            icon: Zap,
            title: "Express Resolution",
            description: "Need it fixed fast? Book a verified gig worker for immediate on-ground resolution.",
            color: "from-amber-500 to-orange-600"
        }
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse" />
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            style={{ y: heroY, opacity: heroOpacity }}
                            className="space-y-8"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                                    <Sparkles size={16} className="animate-pulse" />
                                    Powered by Google Gemini AI
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                    Empowering Citizens,
                                    <br />
                                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                                        Saving Cities.
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl text-slate-500 leading-relaxed max-w-lg"
                            >
                                Urban Eye uses advanced AI to detect, track, and resolve civic infrastructure issues.
                                Join the movement for smarter, safer cities.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <NavLink
                                    to="/analyze"
                                    className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all"
                                >
                                    <Sparkles size={20} />
                                    Try AI Analysis
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </NavLink>
                                <NavLink
                                    to={getDashboardRoute()}
                                    className="group flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
                                >
                                    <Play size={18} className="text-indigo-600" />
                                    View Live Map
                                </NavLink>
                            </motion.div>

                            {/* Trust Badges */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex items-center gap-6 pt-4"
                            >
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <CheckCircle size={16} className="text-green-500" />
                                    <span>Free to use</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Shield size={16} className="text-indigo-500" />
                                    <span>Government verified</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Zap size={16} className="text-amber-500" />
                                    <span>Instant results</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <div className="relative">
                                {/* Main Dashboard Preview Card */}
                                <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="bg-slate-800 rounded-2xl p-4 mb-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-slate-400 text-sm">Live Issues Map</span>
                                            <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                LIVE
                                            </span>
                                        </div>
                                        <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                                            <Map size={48} className="text-indigo-400 opacity-50" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-indigo-500/20 rounded-xl p-3 text-center">
                                            <p className="text-2xl font-black text-indigo-400">{stats.totalReports}</p>
                                            <p className="text-xs text-slate-400">Reports</p>
                                        </div>
                                        <div className="bg-emerald-500/20 rounded-xl p-3 text-center">
                                            <p className="text-2xl font-black text-emerald-400">{stats.resolvedReports}</p>
                                            <p className="text-xs text-slate-400">Resolved</p>
                                        </div>
                                        <div className="bg-purple-500/20 rounded-xl p-3 text-center">
                                            <p className="text-2xl font-black text-purple-400">{stats.activeUsers}</p>
                                            <p className="text-xs text-slate-400">Users</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Cards */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Activity size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">System Status</p>
                                            <p className="font-bold text-slate-800">Operational</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                            <Sparkles size={20} className="text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">AI Accuracy</p>
                                            <p className="font-bold text-slate-800">98.5%</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-32 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">How it works</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-4">
                            AI-Powered Civic Intelligence
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            From detection to resolution, our platform streamlines the entire civic issue lifecycle.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview with Scroll Animation */}
            <section className="bg-slate-50">
                <ContainerScroll
                    titleComponent={
                        <>
                            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">See it in action</span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-3">
                                Powerful Dashboard <br />
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    At Your Fingertips
                                </span>
                            </h2>
                        </>
                    }
                >
                    <div className="h-full w-full bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-4 flex gap-4 overflow-hidden">
                        {/* Sidebar */}
                        <div className="hidden md:flex flex-col w-56 shrink-0 space-y-3">
                            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <Activity size={16} className="text-white" />
                                </div>
                                <span className="text-white font-bold text-sm">UrbanEye</span>
                            </div>
                            {[
                                { icon: '🔴', label: 'Critical', value: '24' },
                                { icon: '🟡', label: 'In Progress', value: '156' },
                                { icon: '🟢', label: 'Resolved', value: '89' }
                            ].map((s, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    <span className="text-lg">{s.icon}</span>
                                    <p className="text-xl font-bold text-white">{s.value}</p>
                                    <p className="text-xs text-slate-400">{s.label}</p>
                                </div>
                            ))}
                            <div className="mt-auto p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-green-400 text-xs font-bold">LIVE</span>
                                </div>
                            </div>
                        </div>

                        {/* Delhi Heatmap */}
                        <div className="flex-1 bg-slate-900/50 rounded-2xl relative overflow-hidden border border-white/10">
                            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                                <Map size={16} className="text-indigo-400" />
                                <span className="text-white text-sm font-bold">Delhi NCR Heatmap</span>
                            </div>

                            {/* Real Leaflet Map */}
                            <MapContainer
                                center={[28.6139, 77.2090]}
                                zoom={12}
                                scrollWheelZoom={false}
                                zoomControl={false}
                                dragging={false}
                                style={{ height: '100%', width: '100%', borderRadius: '16px' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; OpenStreetMap'
                                />
                                {/* Delhi Issue Hotspots */}
                                {[
                                    { pos: [28.6315, 77.2167], name: 'Connaught Place', severity: 'high', count: 45 },
                                    { pos: [28.6519, 77.1909], name: 'Karol Bagh', severity: 'high', count: 32 },
                                    { pos: [28.6562, 77.2328], name: 'Chandni Chowk', severity: 'medium', count: 28 },
                                    { pos: [28.5355, 77.2069], name: 'Saket', severity: 'medium', count: 19 },
                                    { pos: [28.5673, 77.3211], name: 'Noida', severity: 'low', count: 15 },
                                    { pos: [28.5921, 77.0460], name: 'Dwarka', severity: 'low', count: 12 },
                                    { pos: [28.7041, 77.1025], name: 'Rohini', severity: 'medium', count: 22 },
                                    { pos: [28.6280, 77.2789], name: 'Mayur Vihar', severity: 'low', count: 8 }
                                ].map((spot, i) => (
                                    <CircleMarker
                                        key={i}
                                        center={spot.pos}
                                        radius={spot.severity === 'high' ? 25 : spot.severity === 'medium' ? 18 : 12}
                                        pathOptions={{
                                            color: spot.severity === 'high' ? '#ef4444' : spot.severity === 'medium' ? '#f59e0b' : '#22c55e',
                                            fillColor: spot.severity === 'high' ? '#ef4444' : spot.severity === 'medium' ? '#f59e0b' : '#22c55e',
                                            fillOpacity: 0.4,
                                            weight: 2
                                        }}
                                    >
                                        <Popup>
                                            <div className="text-center">
                                                <strong>{spot.name}</strong>
                                                <p className="text-sm">{spot.count} active issues</p>
                                            </div>
                                        </Popup>
                                    </CircleMarker>
                                ))}
                            </MapContainer>

                            {/* Overlay Controls */}
                            <div className="absolute top-3 left-3 flex items-center gap-2 z-[1000]">
                                <MapPin size={16} className="text-indigo-600" />
                                <span className="text-slate-800 text-sm font-bold bg-white/90 backdrop-blur shadow-lg px-3 py-1.5 rounded-lg">Delhi NCR Live</span>
                            </div>

                            {/* Legend */}
                            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur shadow-lg rounded-xl p-3 flex gap-4 text-xs z-[1000]">
                                <span className="flex items-center gap-1.5 text-slate-700 font-medium"><span className="w-3 h-3 bg-red-500 rounded-full" /> High</span>
                                <span className="flex items-center gap-1.5 text-slate-700 font-medium"><span className="w-3 h-3 bg-amber-500 rounded-full" /> Med</span>
                                <span className="flex items-center gap-1.5 text-slate-700 font-medium"><span className="w-3 h-3 bg-green-500 rounded-full" /> Low</span>
                            </div>

                            {/* Active Count */}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur shadow-lg rounded-xl p-3 text-right z-[1000]">
                                <p className="text-2xl font-black text-indigo-600">1,247</p>
                                <p className="text-xs text-slate-500">Active Issues</p>
                            </div>
                        </div>
                    </div>
                </ContainerScroll>
            </section>

            {/* Leaderboard Section */}
            <section ref={leaderboardRef} className="py-32 bg-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isLeaderboardInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-indigo-400 font-bold text-sm uppercase tracking-wider">Community Heroes</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6">
                                Top Contributors
                            </h2>
                            <p className="text-xl text-slate-400 mb-8">
                                Celebrate the citizens making their cities better. Every report earns XP and helps build a safer community.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Trophy size={20} className="text-amber-400" />
                                    <span>5 XP per report</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Star size={20} className="text-amber-400" />
                                    <span>Monthly rewards</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Leaderboard Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isLeaderboardInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Trophy size={24} className="text-amber-400" />
                                    Leaderboard
                                </h3>
                                <span className="text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-full">This Week</span>
                            </div>

                            <div className="space-y-3">
                                {leaderboard.map((user, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isLeaderboardInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-slate-700/50 ${index === 0 ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20' : 'bg-slate-700/30'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                                            index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800' :
                                                index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                                                    'bg-slate-600 text-slate-300'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-white">{user.name}</p>
                                            <p className="text-sm text-slate-400">{user.report_count} reports</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-indigo-400">{user.xp} XP</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <NavLink
                                to={getDashboardRoute()}
                                className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all"
                            >
                                View Full Leaderboard
                                <ChevronRight size={18} />
                            </NavLink>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                            Ready to make a difference?
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                            Join thousands of citizens using Urban Eye to create cleaner, safer, and smarter cities.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <NavLink
                                to="/signup"
                                className="group flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                            >
                                Get Started Free
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </NavLink>
                            <NavLink
                                to="/analyze"
                                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all"
                            >
                                <Sparkles size={18} />
                                Try AI Demo
                            </NavLink>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <Activity size={22} className="text-white" />
                            </div>
                            <span className="text-xl font-black text-white">
                                Urban<span className="text-indigo-400">Eye</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            © 2026 UrbanEye. Built for Smart Cities Hackathon.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
