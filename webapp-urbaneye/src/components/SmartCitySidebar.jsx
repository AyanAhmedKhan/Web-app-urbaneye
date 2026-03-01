import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Zap, Flame, Gauge, AlertOctagon, Wifi, Link2, ChevronLeft, ChevronRight, Home, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

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
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">
            {/* Sidebar */}
            <aside className={`${collapsed ? 'w-[72px]' : 'w-[240px]'} bg-slate-900 border-r border-white/5 flex flex-col transition-all duration-300 flex-shrink-0 relative max-lg:hidden`}>
                {/* Brand */}
                <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
                    <div className="w-9 h-9 min-w-[36px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        <LayoutDashboard size={18} />
                    </div>
                    {!collapsed && <span className="font-bold text-white text-sm truncate">Smart City</span>}
                </div>

                {/* Back to Dashboard */}
                <div className="px-3 pt-4 pb-2">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all text-sm font-medium ${collapsed ? 'justify-center' : ''}`}
                        title="Back to Dashboard"
                    >
                        <Home size={18} className="flex-shrink-0" />
                        {!collapsed && <span>Dashboard</span>}
                    </button>
                </div>

                {/* Divider + Label */}
                <div className="px-3 pt-2">
                    {!collapsed && <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold mb-2 px-3">Platform</p>}
                </div>

                {/* Links */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    {links.map(link => {
                        const isActive = location.pathname === link.route;
                        return (
                            <button
                                key={link.route}
                                onClick={() => navigate(link.route)}
                                className={`
                                    flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                                    ${collapsed ? 'justify-center' : ''}
                                    ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                                title={collapsed ? link.label : ''}
                            >
                                <div className={`w-7 h-7 min-w-[28px] bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <link.icon size={14} className="text-white" />
                                </div>
                                {!collapsed && <span className="truncate">{link.label}</span>}
                                {isActive && !collapsed && (
                                    <span className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Collapse toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-50"
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            </aside>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default SmartCitySidebar;
