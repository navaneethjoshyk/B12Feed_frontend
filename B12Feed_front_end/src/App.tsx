import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Discover from './pages/Discover';
import MyPostings from './pages/MyPostings'; 
import ResourceDetails from './pages/ResourceDetails';
import CheckEmail from './pages/CheckEmail';
import RegisterCreate from './pages/RegisterCreate';
import RegisterJoin from './pages/RegisterJoin';
import RegisterChoice from './pages/RegisterChoice';
import Success from './pages/Success';
import ShareFood from './pages/ShareFood';
import PrivateRoute from './components/PrivateRoute';

// NEW: Import the MyClaims component
import MyClaims from './pages/MyClaims'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />

        {/* Registration Flow */}
        <Route path="/signup" element={<RegisterChoice />} />
        <Route path="/signup/create" element={<RegisterCreate />} />
        <Route path="/signup/join" element={<RegisterJoin />} />
        <Route path="/signup/success" element={<Success />} />

        {/* --- Protected Routes --- */}
        <Route 
          path="/discover" 
          element={<PrivateRoute><Discover /></PrivateRoute>} 
        />

        {/* Updated: This now handles both /my-postings and /my-resources if needed */}
        <Route 
          path="/my-postings" 
          element={<PrivateRoute><MyPostings /></PrivateRoute>} 
        />

        {/* UPDATED: Swapped placeholder with actual MyClaims component */}
        <Route 
          path="/my-claims" 
          element={
            <PrivateRoute>
              <MyClaims />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/share-food" 
          element={<PrivateRoute><ShareFood /></PrivateRoute>} 
        />

        <Route 
          path="/resource/:id" 
          element={<PrivateRoute><ResourceDetails /></PrivateRoute>} 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 