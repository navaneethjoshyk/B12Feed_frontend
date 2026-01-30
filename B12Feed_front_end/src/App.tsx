import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Discover from './pages/Discover';
import ResourceDetails from './pages/ResourceDetails';
import CheckEmail from './pages/CheckEmail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The main login page */}
        <Route path="/" element={<SignIn />} />
        
        {/* The forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* The discover page */}
        <Route path="/discover" element={<Discover />} />

        {/* The Resource Details page */}
        <Route path="/resource/:id" element={<ResourceDetails />} />

        {/* Add this line to access the page at /check-email */}
        <Route path="/check-email" element={<CheckEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;