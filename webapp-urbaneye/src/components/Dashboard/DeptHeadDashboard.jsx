import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, FileText, Settings, LogOut,
    Menu, X, Search, MapPin, Filter, RefreshCw,
    Clock, CheckCircle, Activity, ChevronRight, ChevronLeft, Building, UserPlus
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard/GovAdminDashboard.css'; // Reusing Gov Admin styles for consistency

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/v1';

const DeptHeadDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [reports, setReports] = useState([]);
    const [fieldOfficers, setFieldOfficers] = useState([]);
    const [stats, setStats] = useState({
        total: 0, resolved: 0, pending: 0, inProgress: 0
    });

    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            // Fetch Reports (Backend filters by Dept automatically for dept_head)
            const res = await axios.get(`${API_BASE}/reports`, { headers });
            const data = res.data.reports || [];
            setReports(data);

            // Calculate Stats
            setStats({
                total: data.length,
                resolved: data.filter(r => r.status === 'resolved').length,
                pending: data.filter(r => r.status === 'open').length,
                inProgress: data.filter(r => ['in_progress', 'assigned'].includes(r.status)).length
            });

            // Fetch Field Officers (Staff)
            const staffRes = await axios.get(`${API_BASE}/gov/staff`, { headers });
            if (staffRes.data.success) {
                // Filter officers in SAME department
                const officers = staffRes.data.staff.filter(s => s.role === 'field_officer' && s.department === user.department);
                setFieldOfficers(officers);
            }

        } catch (error) {
            console.error("Error fetching data", error);
        }
        setLoading(false);
    };

    const handleAssign = async (officerId) => {
        if (!selectedReport) return;
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await axios.put(`${API_BASE}/reports/${selectedReport.id}/assign`, { officerId }, { headers });

            alert(`Report Assigned to Officer!`);
            setAssignModalOpen(false);
            fetchDashboardData(); // Refresh
        } catch (error) {
            console.error("Assign error", error);
            alert("Failed to assign.");
        }
    };

    const handleLogout = () => { logout(); navigate('/login'); };

    const navItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { id: 'reports', icon: FileText, label: 'Department Reports' },
        { id: 'team', icon: Users, label: 'My Field Team' },
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

            {/* Sidebar */}
            <aside className={`gov-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="gov-brand">
                    <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                        <Building size={sidebarCollapsed ? 20 : 28} />
                    </div>
                    {!sidebarCollapsed && (
                        <div className="brand-text">
                            <span className="brand-name">UrbanEye</span>
                            <span className="brand-role">{user?.department} Head</span>
                        </div>
                    )}
                    <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                    {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                <nav className="gov-nav">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-btn ${activeView === item.id ? 'active' : ''}`}
                            onClick={() => { setActiveView(item.id); setMobileMenuOpen(false); }}
                            title={sidebarCollapsed ? item.label : ''}
                        >
                            <item.icon size={20} />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="gov-sidebar-footer">
                    {!sidebarCollapsed && (
                        <div className="user-info">
                            <div className="user-avatar" style={{ background: '#3b82f6' }}>
                                {user?.name?.charAt(0) || 'D'}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name}</span>
                                <span className="user-role">{user?.department} Dept.</span>
                            </div>
                        </div>
                    )}
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`gov-main ${sidebarCollapsed ? 'expanded' : ''}`}>
                <header className="gov-header">
                    <div className="header-content">
                        <h1 className="page-title">
                            {activeView === 'overview' && 'Department Overview'}
                            {activeView === 'reports' && 'Manage Reports'}
                            {activeView === 'team' && 'Field Officers'}
                            {activeView === 'settings' && 'Settings'}
                        </h1>
                        <p className="page-subtitle">Welcome back, {user?.name}</p>
                    </div>
                    <button className="action-btn" onClick={fetchDashboardData}>
                        <RefreshCw size={18} className={loading ? 'spin' : ''} />
                        Refresh
                    </button>
                </header>

                <div className="gov-content">
                    {loading ? (
                        <div className="loading-state">
                            <RefreshCw size={48} className="spin" />
                            <p>Loading data...</p>
                        </div>
                    ) : (
                        <>
                            {activeView === 'overview' && (
                                <div className="gov-overview">
                                    <div className="stats-grid">
                                        <div className="stat-card blue">
                                            <FileText size={24} />
                                            <div className="stat-value">{stats.total}</div>
                                            <div className="stat-label">Total Reports</div>
                                        </div>
                                        <div className="stat-card orange">
                                            <Clock size={24} />
                                            <div className="stat-value">{stats.pending}</div>
                                            <div className="stat-label">Pending Allocation</div>
                                        </div>
                                        <div className="stat-card purple">
                                            <Activity size={24} />
                                            <div className="stat-value">{stats.inProgress}</div>
                                            <div className="stat-label">In Progress</div>
                                        </div>
                                        <div className="stat-card green">
                                            <CheckCircle size={24} />
                                            <div className="stat-value">{stats.resolved}</div>
                                            <div className="stat-label">Resolved</div>
                                        </div>
                                    </div>

                                    <h3>Recent Urgent Reports</h3>
                                    <div className="recent-section">
                                        <div className="recent-list">
                                            {reports.filter(r => r.status === 'open').slice(0, 5).map(report => (
                                                <div key={report.id} className="recent-item">
                                                    <div className={`recent-sev ${report.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: '4px', height: '40px', background: report.severity === 'high' ? '#ef4444' : '#f59e0b', borderRadius: '2px' }}></div>
                                                    <div className="recent-info">
                                                        <span className="recent-cat">{report.category}</span>
                                                        <span className="recent-dept">{report.description}</span>
                                                    </div>
                                                    <button className="action-btn primary" onClick={() => { setSelectedReport(report); setAssignModalOpen(true); }}>
                                                        Assign
                                                    </button>
                                                </div>
                                            ))}
                                            {reports.filter(r => r.status === 'open').length === 0 && <p className="no-data">No open reports to assign.</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeView === 'reports' && (
                                <div className="reports-view">
                                    <div className="recent-list">
                                        {reports.map(report => (
                                            <div key={report.id} className="recent-item" style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                                                <div className="recent-info">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span className="recent-cat" style={{ fontSize: '1rem' }}>{report.category}</span>
                                                        <span className={`status-badge ${report.status}`} style={{
                                                            padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem',
                                                            background: report.status === 'open' ? '#fef3c7' : report.status === 'resolved' ? '#dcfce7' : '#dbeafe',
                                                            color: report.status === 'open' ? '#d97706' : report.status === 'resolved' ? '#16a34a' : '#1e40af'
                                                        }}>
                                                            {report.status.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '4px 0' }}>{report.description}</p>
                                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '1rem' }}>
                                                        <span>Severity: {report.severity}</span>
                                                        <span>Assigned: {report.assigned_to ? 'Yes' : 'No'}</span>
                                                    </div>
                                                </div>
                                                {report.status === 'open' && (
                                                    <button className="action-btn primary" onClick={() => { setSelectedReport(report); setAssignModalOpen(true); }}>
                                                        Assign
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeView === 'team' && (
                                <div className="team-view">
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                                        {fieldOfficers.map(officer => (
                                            <div key={officer.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                                <div style={{ width: '60px', height: '60px', background: '#f1f5f9', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Users size={30} color="#64748b" />
                                                </div>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{officer.name}</h3>
                                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>{officer.email}</p>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                                    <span style={{ padding: '4px 12px', background: '#dbeafe', color: '#1e40af', borderRadius: '15px', fontSize: '0.75rem' }}>
                                                        Available
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {fieldOfficers.length === 0 && <p className="no-data">No field officers found in your department.</p>}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Assign Modal */}
                {assignModalOpen && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
                    }}>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '400px', maxWidth: '90%' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Assign Report</h2>
                            <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>Select a field officer to handle this issue.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                                {fieldOfficers.map(officer => (
                                    <button
                                        key={officer.id}
                                        onClick={() => handleAssign(officer.id)}
                                        style={{
                                            padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white',
                                            textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                        }}
                                    >
                                        <span>{officer.name}</span>
                                        <UserPlus size={16} />
                                    </button>
                                ))}
                                {fieldOfficers.length === 0 && <p>No officers available.</p>}
                            </div>

                            <button
                                onClick={() => setAssignModalOpen(false)}
                                style={{ marginTop: '1.5rem', width: '100%', padding: '0.75rem', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DeptHeadDashboard;
