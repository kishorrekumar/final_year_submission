import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, LogOut, LayoutDashboard, FileText, CheckCircle, Clock, Loader2 } from 'lucide-react';

const AdminPage = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:6002/api/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: 'var(--card-bg)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <div className="logo">
            <ShieldCheck size={28} color="var(--primary-color)" />
            <span style={{ background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RIT Admin</span>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '2rem 1rem' }}>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600', borderLeft: '3px solid var(--primary-color)' }}>
                <LayoutDashboard size={20} />
                Dashboard
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ padding: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={handleLogout} className="btn" style={{ width: '100%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', gap: '0.5rem', fontWeight: '600' }}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0', right: '0', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0, pointerEvents: 'none' }} />

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Project Submissions</h1>
            <p style={{ color: 'var(--text-muted)' }}>Review and manage final year project documents.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card-bg)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(to right, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
              A
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Admin User</div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
          <div className="card" style={{ padding: '2rem', background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Total Submissions</p>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{submissions.length}</h3>
              </div>
              <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '0.75rem' }}>
                <FileText size={24} color="var(--primary-color)" />
              </div>
            </div>
          </div>
        </div>

        {/* Submissions Grid */}
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', position: 'relative', zIndex: 1, fontWeight: '700' }}>Recent Submissions</h2>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : submissions.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-color)', border: '1px dashed var(--border-color)' }}>
            <Clock size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>No project submissions found yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            {submissions.map((sub) => (
              <div key={sub.id} className="card animate-fade-in" style={{ padding: '1.5rem', background: 'var(--card-bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'inline-flex', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle size={12} /> Submitted
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sub.projectTitle}
                </h3>
                
                <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <p style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Student:</strong> {sub.studentName}</p>
                  <p style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Reg No:</strong> {sub.registerNumber}</p>
                  <p><strong style={{ color: 'var(--text-main)' }}>Guide:</strong> {sub.guideName}</p>
                </div>

                <button onClick={() => navigate(`/admin/submission/${sub.id}`)} className="btn btn-primary" style={{ width: '100%', borderRadius: '0.5rem', padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', border: '1px solid rgba(99, 102, 241, 0.2)', transition: 'all 0.2s', fontWeight: '600' }} onMouseOver={e => e.currentTarget.style.background='rgba(99, 102, 241, 0.15)'} onMouseOut={e => e.currentTarget.style.background='rgba(99, 102, 241, 0.1)'}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
