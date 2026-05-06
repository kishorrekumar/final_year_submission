import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShieldCheck, FileText, ExternalLink, Loader2, Calendar } from 'lucide-react';

const SubmissionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://localhost:6002/api/submissions/${id}`);
        setSubmission(response.data);
      } catch (err) {
        setError('Failed to fetch submission details');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const renderFileLink = (label, path) => {
    if (!path) return null;
    const filename = path.split(/[/\\]/).pop();
    const url = `http://localhost:6002/uploads/${path.replace('server\\uploads\\', '').replace('server/uploads/', '')}`;
    
    return (
      <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', boxShadow: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '0.5rem' }}>
            <FileText size={24} color="var(--primary-color)" />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>{label}</div>
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flex: 1, wordBreak: 'break-all', fontWeight: '500' }}>{filename}</div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }} onMouseOver={e => e.currentTarget.style.background='rgba(99, 102, 241, 0.15)'} onMouseOut={e => e.currentTarget.style.background='rgba(99, 102, 241, 0.1)'}>
          View Document <ExternalLink size={16} />
        </a>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Error</h2>
        <p style={{ color: 'var(--danger)', fontWeight: '500' }}>{error || 'Submission not found'}</p>
        <button onClick={() => navigate('/admin')} className="btn btn-primary">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', paddingBottom: '4rem' }}>
      
      <nav className="navbar" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button onClick={() => navigate('/admin')} className="btn" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '600' }} onMouseOver={e => e.currentTarget.style.background='rgba(0,0,0,0.03)'} onMouseOut={e => e.currentTarget.style.background='transparent'}>
              <ArrowLeft size={18} /> Back
            </button>
            <Link to="/admin" className="logo" style={{ textDecoration: 'none' }}>
              <ShieldCheck size={28} color="var(--primary-color)" />
              <span style={{ background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800', fontSize: '1.25rem' }}>RIT Admin</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: '3rem', maxWidth: '1000px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '500' }}>
            <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontWeight: '700' }}>Submitted</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {new Date(submission.createdAt).toLocaleString()}</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{submission.projectTitle}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Submission Details & Documents</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="card" style={{ background: 'var(--card-bg)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Student Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{submission.studentName}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Register Number</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700', fontFamily: 'monospace' }}>{submission.registerNumber}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Year & Section</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{submission.yearSection}</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--card-bg)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Project Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Guide</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{submission.guideName}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Declaration Status</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--success)', fontWeight: '700' }}>Accepted</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--card-bg)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Project Outcome Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Publication Type</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{submission.outcomeType || 'N/A'}</p>
              </div>
              {submission.conferenceType && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conference Scale</p>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{submission.conferenceType}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '1.5rem' }}>Uploaded Documents</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {renderFileLink("Review 1 PPT", submission.review1Ppt)}
          {renderFileLink("Review 2 PPT", submission.review2Ppt)}
          {renderFileLink("Review 3 PPT", submission.review3Ppt)}
          {renderFileLink("Final Review PPT", submission.review4Ppt)}
          {renderFileLink("Thesis Document", submission.thesisDoc)}
          {renderFileLink("Signed Thesis PDF", submission.signedThesisPdf)}
          {renderFileLink("Outcome Proof PDF", submission.outcomeProofPdf)}
          {renderFileLink("Outcome Certificate PDF", submission.outcomeCertificatePdf)}
          {renderFileLink("Coding Document", submission.codingDoc)}
          {renderFileLink("Project Video", submission.projectVideo)}
          {renderFileLink("Experimental Results", submission.experimentalScreenshots)}
        </div>
      </main>
    </div>
  );
};

export default SubmissionDetailsPage;
