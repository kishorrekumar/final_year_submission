import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, ShieldCheck, Loader2, AlertCircle, FileText } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api.js';

const SubmissionPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    studentName: '', registerNumber: '', yearSection: '', projectTitle: '', guideName: '', declaration: false,
    outcomeType: '', conferenceType: ''
  });
  const [files, setFiles] = useState({});

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 8));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const showToast = (message, type = 'error') => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      showToast('You must accept the declaration to submit.', 'error');
      return;
    }
    setLoading(true);
    const submitData = new FormData();
    Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
    Object.keys(files).forEach(key => { if (files[key]) submitData.append(key, files[key]); });

    try {
      await axios.post(API_ENDPOINTS.SUBMISSIONS, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess(true);
      showToast('Project submitted successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'An error occurred during submission.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1); setSuccess(false); setFiles({}); setToast(null);
    setFormData({ studentName: '', registerNumber: '', yearSection: '', projectTitle: '', guideName: '', declaration: false, outcomeType: '', conferenceType: '' });
  };

  const renderFileUploader = (label, name, accept, helpText) => (
    <div className="form-group animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <label className="form-label" style={{ color: 'var(--text-main)', fontSize: '1rem', fontWeight: '600' }}>{label}</label>
      <div style={{ 
        border: `2px dashed ${files[name] ? 'var(--success)' : 'var(--border-color)'}`, 
        padding: '2.5rem', borderRadius: '1rem', textAlign: 'center', 
        backgroundColor: files[name] ? 'rgba(16, 185, 129, 0.05)' : '#f1f5f9', 
        transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden'
      }}>
        {files[name] && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--success)' }} />}
        <input type="file" name={name} id={name} accept={accept} onChange={handleFileChange} style={{ display: 'none' }} />
        <label htmlFor={name} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          {files[name] ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
              <FileText size={36} color="var(--success)" />
            </div>
          ) : (
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%' }}>
              <Upload size={36} color="var(--primary-color)" />
            </div>
          )}
          <div>
            <span style={{ fontWeight: '600', fontSize: '1.1rem', color: files[name] ? 'var(--success)' : 'var(--text-main)', display: 'block' }}>
              {files[name] ? files[name].name : `Click to upload ${accept}`}
            </span>
            {helpText && !files[name] && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>{helpText}</span>}
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }} />

      {toast && (
        <div style={{ 
          position: 'fixed', top: '2rem', right: '2rem', zIndex: 50, padding: '1rem 1.5rem', borderRadius: '0.5rem', 
          backgroundColor: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', fontWeight: '500', 
          display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.3s ease-out forwards'
        }}>
          {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          {toast.message}
        </div>
      )}

      <nav className="navbar" style={{ position: 'relative', zIndex: 10, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logo">
            <ShieldCheck size={28} color="var(--primary-color)" />
            <span style={{ background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RIT</span> <span style={{ color: 'var(--text-main)' }}>Project Portal</span>
          </Link>
          <div>
            <Link to="/login" className="btn" style={{ backgroundColor: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>Admin Login</Link>
          </div>
        </div>
      </nav>

      <main className="container" style={{ padding: '4rem 0', maxWidth: '850px', position: 'relative', zIndex: 10 }}>
        {success ? (
          <div className="card" style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--card-bg)' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <CheckCircle size={48} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-main)' }}>Submission Successful!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
              Your final year project documents have been securely uploaded to the department portal. Thank you!
            </p>
            <button onClick={handleReset} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '2rem', background: 'linear-gradient(to right, #6366f1, #8b5cf6)', border: 'none' }}>
              Submit Another Project
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #1e293b, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Project Submission</h1>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Step {step}</span>
                <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', width: '200px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(to right, #6366f1, #8b5cf6)', width: `${(step / 9) * 100}%`, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                </div>
                <span style={{ fontWeight: '500' }}>of 8</span>
              </div>
            </div>

            <div className="card" style={{ background: 'var(--card-bg)' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ minHeight: '350px' }}>
                  {step === 1 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>1</span>
                        Student Details
                      </h2>
                      <div className="form-group">
                        <label className="form-label">Student Name</label>
                        <input type="text" name="studentName" className="form-input" value={formData.studentName} onChange={handleInputChange} required placeholder="Enter full name" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Register Number</label>
                        <input type="text" name="registerNumber" className="form-input" value={formData.registerNumber} onChange={handleInputChange} required placeholder="e.g. 953623243049" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Year / Section</label>
                        <select name="yearSection" className="form-input" style={{ color: formData.yearSection ? 'var(--text-main)' : 'var(--text-muted)' }} value={formData.yearSection} onChange={handleInputChange} required>
                          <option value="" disabled>Select Year/Section</option>
                          <option value="4th Year / A">4th Year / A</option>
                          <option value="4th Year / B">4th Year / B</option>
                          <option value="4th Year / C">4th Year / C</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>2</span>
                        Project Information
                      </h2>
                      <div className="form-group">
                        <label className="form-label">Project Title</label>
                        <input type="text" name="projectTitle" className="form-input" value={formData.projectTitle} onChange={handleInputChange} required placeholder="Complete project title" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Project Guide Name</label>
                        <input type="text" name="guideName" className="form-input" value={formData.guideName} onChange={handleInputChange} required placeholder="Guide's full name" />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>3</span>
                        Review PPT Uploads
                      </h2>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {renderFileUploader('Review 1 PPT', 'review1Ppt', '.ppt,.pptx,.pdf')}
                        {renderFileUploader('Review 2 PPT', 'review2Ppt', '.ppt,.pptx,.pdf')}
                        {renderFileUploader('Review 3 PPT', 'review3Ppt', '.ppt,.pptx,.pdf')}
                        {renderFileUploader('Review 4 PPT (Final)', 'review4Ppt', '.ppt,.pptx,.pdf')}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>4</span>
                        Thesis Submission
                      </h2>
                      {renderFileUploader('Thesis Document (Word)', 'thesisDoc', '.doc,.docx')}
                      <div style={{ marginTop: '1.5rem' }}>
                        {renderFileUploader('Signed Thesis PDF', 'signedThesisPdf', '.pdf', 'Include: First Cover Page, Bonafide Certificate (Signed), Abstract')}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>5</span>
                        Project Outcome / Publication
                      </h2>
                      
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Publication Type</label>
                        <select name="outcomeType" className="form-input" style={{ color: formData.outcomeType ? 'var(--text-main)' : 'var(--text-muted)' }} value={formData.outcomeType} onChange={handleInputChange} required>
                          <option value="" disabled>Select Journal or Conference</option>
                          <option value="Journal">Journal</option>
                          <option value="Conference">Conference</option>
                        </select>
                      </div>

                      {formData.outcomeType === 'Conference' && (
                        <div className="form-group animate-fade-in">
                          <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Conference Scale</label>
                          <select name="conferenceType" className="form-input" style={{ color: formData.conferenceType ? 'var(--text-main)' : 'var(--text-muted)' }} value={formData.conferenceType} onChange={handleInputChange} required>
                            <option value="" disabled>Select National or International</option>
                            <option value="National">National</option>
                            <option value="International">International</option>
                          </select>
                        </div>
                      )}

                      {formData.outcomeType && (
                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div style={{ padding: '1.5rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>1. Upload Proof</h3>
                            {renderFileUploader(`${formData.outcomeType} Proof (PDF)`, 'outcomeProofPdf', '.pdf', `Upload the paper, proceedings, or submission proof`)}
                          </div>
                          
                          <div style={{ padding: '1.5rem', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>2. Upload Certificate</h3>
                            {renderFileUploader(`${formData.outcomeType} Certificate (PDF)`, 'outcomeCertificatePdf', '.pdf', `Upload the official presentation/publication certificate`)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 6 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>6</span>
                        Coding & Implementation
                      </h2>
                      {renderFileUploader('Coding Document (Word)', 'codingDoc', '.doc,.docx')}
                    </div>
                  )}


                  {step === 7 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>7</span>
                        Experimental Results
                      </h2>
                      {renderFileUploader('Experimental Screenshots', 'experimentalScreenshots', '.jpg,.jpeg,.png', 'Upload relevant output/result screenshots')}
                    </div>
                  )}

                  {step === 8 && (
                    <div className="animate-fade-in">
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700' }}>
                        <span style={{ background: '#6366f1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>8</span>
                        Declaration
                      </h2>
                      <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', padding: '2rem', borderRadius: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                        <input 
                          type="checkbox" name="declaration" id="declaration" checked={formData.declaration} onChange={handleInputChange}
                          style={{ width: '1.8rem', height: '1.8rem', cursor: 'pointer', accentColor: '#6366f1', marginTop: '0.2rem', flexShrink: 0 }} 
                        />
                        <label htmlFor="declaration" style={{ cursor: 'pointer', lineHeight: '1.6', fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500' }}>
                          “I hereby confirm that all submitted documents are genuine and correspond to my final year project work.”
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                  <button type="button" className="btn" onClick={prevStep} disabled={step === 1} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '2rem', padding: '0.75rem 2rem' }}>
                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back
                  </button>
                  
                  {step < 8 ? (
                    <button type="button" className="btn btn-primary" onClick={nextStep} style={{ borderRadius: '2rem', padding: '0.75rem 2rem', background: 'linear-gradient(to right, #6366f1, #8b5cf6)', border: 'none' }}>
                      Continue <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary" disabled={loading || !formData.declaration} style={{ borderRadius: '2rem', padding: '0.75rem 2.5rem', background: 'linear-gradient(to right, #10b981, #059669)', border: 'none' }}>
                      {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Project'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SubmissionPage;
