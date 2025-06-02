import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';


import NoteListPage from './pages/NoteListPage';
import AddNotePage from './pages/AddNotePage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';


import Navigation from './components/Navigation';
import ThemeToggleButton from './components/ThemeToggleButton';
import LanguageToggleButton from './components/LanguageToggleButton';

// Utils & Hooks
import { getUserLogged, putAccessToken, getAccessToken } from './utils/network-data';
import useTranslation from './hooks/useTranslation'; 

function App() {
  const { t } = useTranslation(); 
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      setInitializing(true); 
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error && data) {
          setAuthedUser(data);
        } else {
          putAccessToken('');
          setAuthedUser(null);
        }
      } else {
        setAuthedUser(null);
      }
      setInitializing(false); 
    };

    fetchUser();
  }, []); 

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();
    if (!error && data) {
      setAuthedUser(data);
      navigate('/'); 
    } else {
      putAccessToken('');
      setAuthedUser(null);
      alert(t('failedGetUserDataAfterLogin') || 'Gagal mendapatkan data pengguna setelah login.');
    }
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
    navigate('/login');
  };

  if (initializing) {
    return (
      <div className="app-container">
        <header>
          <h1>
            <Link to="/" className="app-title-link bold-underline">{t('appName')}</Link>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggleButton />
            <LanguageToggleButton />
          </div>
        </header>
        <main>
          <p style={{ textAlign: 'center', padding: '20px', fontSize: '1.2em' }}>{t('loadingApp')}</p>
        </main>
      </div>
    );
  }

  if (authedUser === null) {
    return (
      <div className="app-container">
        <header>
          <h1>
            <Link to="/" className="app-title-link bold-underline">{t('appName')}</Link>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggleButton />
            <LanguageToggleButton />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/" className="app-title-link bold-underline">{t('appName')}</Link>
        </h1>
        <Navigation logout={onLogout} name={authedUser.name} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<NoteListPage />} />
          <Route path="/notes/new" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
