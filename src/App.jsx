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

// Impor fungsi-fungsi yang dibutuhkan dari network-data.js
import { getUserLogged, putAccessToken, getAccessToken } from './utils/network-data'; //

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const navigate = useNavigate();

  // ... (React.useEffect untuk fetchUser dan onLoginSuccess, onLogout tetap sama)
  React.useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error && data) {
          setAuthedUser(data);
        } else {
          // Token mungkin tidak valid atau ada error, bersihkan
          putAccessToken(''); 
          setAuthedUser(null);
        }
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
      alert('Gagal mendapatkan data pengguna setelah login.');
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
            <Link to="/" className="app-title-link bold-underline">Aplikasi Catatan</Link>
          </h1>
          {/* Bisa juga tambahkan ThemeToggleButton di sini jika ingin muncul saat loading awal */}
          <div style={{ display: 'flex', alignItems: 'center' }}> 
            <ThemeToggleButton />
          </div>
        </header>
        <main>
          <p style={{ textAlign: 'center', padding: '20px', fontSize: '1.2em' }}>Memuat aplikasi...</p>
        </main>
      </div>
    );
  }

  if (authedUser === null) {
    return (
      <div className="app-container">
        <header>
          <h1>
            <Link to="/" className="app-title-link bold-underline">Aplikasi Catatan</Link>
          </h1>
          {/* Ganti navigasi Login/Register dengan tombol tema */}
          <div style={{ display: 'flex', alignItems: 'center' }}> {/* Wrapper untuk positioning jika diperlukan */}
            <ThemeToggleButton />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Arahkan semua rute lain ke /login jika belum terautentikasi */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Jika pengguna sudah login
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/" className="app-title-link bold-underline">Aplikasi Catatan</Link>
        </h1>
        {/* Menggunakan komponen Navigation yang sudah diimpor dan bisa ditambahkan ThemeToggleButton di dalamnya atau di sini */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Navigation logout={onLogout} name={authedUser.name} />
            {/* Jika ThemeToggleButton belum ada di dalam Navigation, Anda bisa letakkan di sini juga */}
            {/* <ThemeToggleButton /> */} 
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<NoteListPage />} />
          <Route path="/notes/new" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          {/* Jika sudah login, mengakses /login atau /register akan diarahkan ke halaman utama */}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;