import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, CheckCircle, FileText, Settings, LogOut,
    Menu, X, MapPin, RefreshCw, Upload, Camera
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard/GovAdminDashboard.css'; // Reusing Gov Admin styles

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/v1';

const FieldOfficerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('tasks'); // tasks, history
    const [loading, setLoading] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await axios.get(`${API_BASE}/reports`, { headers });
            setTasks(res.data.reports || []);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
        setLoading(false);
    };

    const handleResolve = async (taskId) => {
        // In real app, prompt for image upload logic here
        if (!confirm("Confirm resolution of this task?")) return;

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await axios.put(`${API_BASE}/reports/${taskId}/status`, { status: 'resolved' }, { headers });
            alert("Task marked as Resolved! Great work.");
            fetchTasks();
        } catch (error) {
            console.error("Error resolving", error);
            alert("Failed to update status.");
        }
    };

    const handleLogout = () => { logout(); navigate('/login'); };

    const navItems = [
        { id: 'tasks', icon: LayoutDashboard, label: 'My Tasks' },
        { id: 'history', icon: CheckCircle, label: 'History' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <div className="gov-admin-dashboard">
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}

            {/* Sidebar (Simplified) */}
            <aside className={`gov-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="gov-brand">
                    <div className="brand-icon" style={{ background: '#16a34a' }}>
                        <MapPin size={sidebarCollapsed ? 20 : 28} />
                    </div>
                    {!sidebarCollapsed && (
                        <div className="brand-text">
                            <span className="brand-name">UrbanEye</span>
                            <span className="brand-role">Field Officer</span>
                        </div>
                    )}
                    <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="gov-nav">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-btn ${activeView === item.id ? 'active' : ''}`}
                            onClick={() => { setActiveView(item.id); setMobileMenuOpen(false); }}
                        >
                            <item.icon size={20} />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="gov-sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            <main className={`gov-main ${sidebarCollapsed ? 'expanded' : ''}`}>
                <header className="gov-header">
                    <div className="header-content">
                        <h1 className="page-title">
                            {activeView === 'tasks' ? 'Assigned Tasks' : 'Work History'}
                        </h1>
                        <p className="page-subtitle">{user?.name} • {user?.department} Dept.</p>
                    </div>
                    <button className="action-btn" onClick={fetchTasks}>
                        <RefreshCw size={18} className={loading ? 'spin' : ''} />
                    </button>
                </header>

                <div className="gov-content">
                    {loading ? (
                        <div className="loading-state">
                            <RefreshCw size={48} className="spin" />
                            <p>Loading tasks...</p>
                        </div>
                    ) : (
                        <div className="tasks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {tasks.filter(t => activeView === 'tasks' ? t.status !== 'resolved' : t.status === 'resolved').map(task => (
                                <div key={task.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                    <div style={{ height: '6px', background: task.severity === 'high' ? '#ef4444' : task.severity === 'medium' ? '#f59e0b' : '#22c55e' }}></div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: '700', fontSize: '1.1rem', textTransform: 'capitalize' }}>{task.category}</span>
                                            <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '10px', background: '#f1f5f9', color: '#64748b' }}>
                                                {new Date(task.timestamp * 1000).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>{task.description}</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                                            <MapPin size={16} />
                                            <span>Lat: {task.latitude?.toFixed(4)}, Lng: {task.longitude?.toFixed(4)}</span>
                                        </div>

                                        {task.status !== 'resolved' ? (
                                            <button
                                                onClick={() => handleResolve(task.id)}
                                                style={{ width: '100%', padding: '0.875rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                            >
                                                <Camera size={18} />
                                                Mark Resolved
                                            </button>
                                        ) : (
                                            <div style={{ padding: '0.875rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '8px', textAlign: 'center', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                <CheckCircle size={18} />
                                                Completed
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {tasks.length === 0 && <p className="no-data">No tasks found.</p>}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default FieldOfficerDashboard;
