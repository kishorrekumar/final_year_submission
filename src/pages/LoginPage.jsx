import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }} />

      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
        <div className="logo" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          <ShieldCheck size={32} color="var(--primary-color)" />
          <span style={{ fontWeight: '800', color: 'var(--text-main)' }}>RIT Admin Login</span>
        </div>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Lock size={32} color="var(--primary-color)" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
                placeholder="admin@project.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2.5rem' }}>
            <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(to right, #6366f1, #8b5cf6)', border: 'none', padding: '0.875rem', fontWeight: '600' }} disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
