// src/App.jsx
import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

// Pages
import NoteListPage from './pages/NoteListPage';
import AddNotePage from './pages/AddNotePage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

// Components
import Navigation from './components/Navigation';
import ThemeToggleButton from './components/ThemeToggleButton';
import LanguageToggleButton from './components/LanguageToggleButton';

// Utils & Hooks
import { getUserLogged, putAccessToken, getAccessToken } from './utils/network-data';
import useTranslation from './hooks/useTranslation'; // Pastikan path ini benar

// Context Providers (jika App adalah tempat Anda meletakkannya, jika tidak, pastikan sudah ada di index.jsx)
// import { ThemeProvider } from './contexts/ThemeContext';
// import { LanguageProvider } from './contexts/LanguageContext';


function App() {
  const { t } = useTranslation(); // Panggil hook untuk terjemahan
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      setInitializing(true); // Mulai dengan status inisialisasi
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error && data) {
          setAuthedUser(data);
        } else {
          // Token tidak valid atau ada error, bersihkan token dan set user ke null
          putAccessToken('');
          setAuthedUser(null);
        }
      } else {
        // Tidak ada token, pastikan authedUser adalah null
        setAuthedUser(null);
      }
      setInitializing(false); // Selesai inisialisasi
    };

    fetchUser();
  }, []); // Dependency array kosong, hanya dijalankan sekali saat mount

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();
    if (!error && data) {
      setAuthedUser(data);
      navigate('/'); // Navigasi ke halaman utama setelah login berhasil
    } else {
      putAccessToken('');
      setAuthedUser(null);
      // Gunakan t() untuk pesan alert jika memungkinkan dan pastikan key ada di file locale
      alert(t('failedGetUserDataAfterLogin') || 'Gagal mendapatkan data pengguna setelah login.');
    }
  };

  const onLogout = () => {
    console.log('Logging out...'); // Untuk debugging di console
    setAuthedUser(null);
    putAccessToken('');
    console.log('Token cleared, authedUser is null. Navigating to /login'); // Debugging
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
            {/* Arahkan semua path lain ke /login jika pengguna tidak terautentikasi */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Jika pengguna sudah terautentikasi
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
          {/* Jika sudah login, mengakses /login atau /register akan diarahkan ke halaman utama */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
