import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppearanceProvider } from './contexts/AppearanceContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import CancellationGuide from './components/CancellationGuide';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionDetail from './components/SubscriptionDetail';
import AddSubscription from './components/AddSubscription';
import Profile from './components/Profile';
import Checkout from './components/Checkout';
import Alternatives from './components/Alternatives';
import CheckEmailPage from './components/CheckEmailPage';
import VerifyEmailPage from './components/VerifyEmailPage';
import SignupPage from './components/SignupPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import LegalPage from './components/LegalPage';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <AppearanceProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-transparent">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/check-email" element={<CheckEmailPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/privacidad" element={<LegalPage type="notice" />} />
              <Route path="/legal" element={<LegalPage type="notice" />} />
              <Route path="/terms" element={<LegalPage type="terms" />} />
              <Route path="/cookies" element={<LegalPage type="cookies" />} />
              <Route path="/privacy" element={<LegalPage type="privacy" />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/guide/:id" element={<CancellationGuide />} />
              <Route path="/subscriptions" element={<SubscriptionList />} />
              <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
              <Route path="/alternatives/:id" element={<Alternatives />} />
              <Route path="/add" element={<AddSubscription />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <CookieBanner />
        </Router>
      </LanguageProvider>
    </AppearanceProvider>
  );
}

export default App;
