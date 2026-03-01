import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Zap, Flame, Gauge, AlertOctagon, Wifi, Link2, ChevronLeft, ChevronRight, Home, LayoutDashboard, Building, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const links = [
    { label: 'AI Command Center', icon: Brain, route: '/ai-command-center', color: 'from-purple-600 to-indigo-700' },
    { label: 'Electricity Dept', icon: Zap, route: '/electricity', color: 'from-amber-400 to-yellow-600' },
    { label: 'Gas Department', icon: Flame, route: '/gas', color: 'from-orange-500 to-red-600' },
    { label: 'Smart Meters', icon: Gauge, route: '/smart-meters', color: 'from-amber-500 to-orange-600' },
    { label: 'Emergency Mode', icon: AlertOctagon, route: '/emergency-mode', color: 'from-red-500 to-rose-700' },
    { label: 'IoT Devices', icon: Wifi, route: '/smart-city-devices', color: 'from-cyan-500 to-blue-600' },
    { label: 'Govt Integration', icon: Link2, route: '/gov-integration', color: 'from-indigo-500 to-blue-700' },
];

const SmartCitySidebar = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-[1000] p-3 bg-slate-800 border-none rounded-lg text-white cursor-pointer hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[900]"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                ${collapsed ? 'w-20' : 'w-72'}
                ${collapsed ? 'min-w-[80px]' : 'min-w-[288px]'}
                bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                flex flex-col transition-all duration-300 ease-in-out relative z-[100]
                shadow-2xl shadow-slate-900/50
                ${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-[950]' : 'max-lg:hidden'}
            `}>
                {/* Brand Header */}
                <div className="flex items-center gap-3 p-6 mb-2 border-b border-white/10">
                    <div className="w-12 h-12 min-w-[48px] bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                        <Building size={collapsed ? 22 : 28} className="drop-shadow-sm" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-extrabold text-2xl text-white tracking-tight whitespace-nowrap">UrbanEye</span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Smart City</span>
                        </div>
                    )}
                    <button
                        className="lg:hidden ml-auto bg-white/5 border-none p-2 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-white/10 transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Collapse Toggle */}
                <button
                    className="hidden lg:flex items-center justify-center w-full p-2 mb-4 bg-white/5 border-none rounded-lg text-slate-400 cursor-pointer transition-all hover:bg-white/10 hover:text-white"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                {/* Back to Dashboard */}
                <div className="px-3 mb-2">
                    <button
                        onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                        className={`
                            flex items-center gap-3 w-full px-4 py-3 border-none rounded-lg font-medium cursor-pointer transition-all text-left whitespace-nowrap
                            ${collapsed ? 'justify-center px-3.5' : ''}
                            bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white
                        `}
                        title={collapsed ? 'Back to Dashboard' : ''}
                    >
                        <Home size={20} className="flex-shrink-0" />
                        {!collapsed && <span>Dashboard</span>}
                    </button>
                </div>

                {/* Section Label */}
                <div className="px-6 pt-2 pb-1">
                    {!collapsed && (
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Platform</p>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="flex-1 flex flex-col gap-1.5 px-3 overflow-y-auto">
                    {links.map(link => {
                        const isActive = location.pathname === link.route;
                        return (
                            <button
                                key={link.route}
                                onClick={() => { navigate(link.route); setMobileMenuOpen(false); }}
                                className={`
                                    flex items-center gap-3 px-4 py-3 border-none rounded-lg font-medium cursor-pointer transition-all text-left whitespace-nowrap w-full
                                    ${collapsed ? 'justify-center px-3.5' : ''}
                                    ${isActive
                                        ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/5 text-indigo-400 border-l-4 border-indigo-500'
                                        : 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                                title={collapsed ? link.label : ''}
                            >
                                <div className={`w-8 h-8 min-w-[32px] bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                                    <link.icon size={16} className="text-white" />
                                </div>
                                {!collapsed && (
                                    <>
                                        <span className="flex-1">{link.label}</span>
                                        {isActive && (
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        )}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* User Info + Logout */}
                <div className={`border-t border-white/10 p-4 mt-auto flex items-center gap-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                    {!collapsed && (
                        <div className="flex items-center gap-3 flex-1 overflow-hidden">
                            <div className="w-9 h-9 min-w-[36px] bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-white font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{user?.name || 'User'}</span>
                                <span className="text-slate-400 text-xs capitalize">{user?.role?.replace('_', ' ') || 'Smart City'}</span>
                            </div>
                        </div>
                    )}
                    <button
                        className="w-9 h-9 min-w-[36px] bg-red-500/10 border-none rounded-lg text-red-500 cursor-pointer flex items-center justify-center hover:bg-red-500/20 transition-colors"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default SmartCitySidebar;
