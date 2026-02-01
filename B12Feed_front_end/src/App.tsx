import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Discover from './pages/Discover';
import ResourceDetails from './pages/ResourceDetails';
import CheckEmail from './pages/CheckEmail';
import RegisterCreate from './pages/RegisterCreate';
import RegisterJoin from './pages/RegisterJoin';
import RegisterChoice from './pages/RegisterChoice';
import Success from './pages/Success';

function App() {
  return (
    <BrowserRouter>
      <Routes>


        {/* The main login page */}
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />

       {/* Registration Flow Routes */}
        <Route path="/signup" element={<RegisterChoice />} />
        <Route path="/signup/create" element={<RegisterCreate />} />
        <Route path="/signup/join" element={<RegisterJoin />} />
        
        {/* The Success Route */}
        <Route path="/signup/success" element={<Success />} />
        
        {/* The forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* The discover page */}
        <Route path="/discover" element={<Discover />} />

        {/* The Resource Details page */}
        <Route path="/resource/:id" element={<ResourceDetails />} />

        {/* Add this line to access the page at /check-email */}
        <Route path="/check-email" element={<CheckEmail />} />


        <Route path="/signup/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;