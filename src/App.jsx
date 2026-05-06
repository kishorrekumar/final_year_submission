import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import SubmissionPage from './pages/SubmissionPage';
import SubmissionDetailsPage from './pages/SubmissionDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmissionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/submission/:id" 
          element={
            <ProtectedRoute>
              <SubmissionDetailsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
