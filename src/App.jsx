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
import Alternatives from './components/Alternatives';

function App() {
  return (
    <AppearanceProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-transparent">
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guide/:id" element={<CancellationGuide />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
          <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
          <Route path="/alternatives/:id" element={<Alternatives />} />
          <Route path="/add" element={<AddSubscription />} />
          <Route path="/profile" element={<Profile />} />
          </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AppearanceProvider>
  );
}

export default App;
