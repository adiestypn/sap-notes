import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import NoteListPage from './pages/NoteListPage';
import AddNotePage from './pages/AddNotePage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation'; // Impor komponen Navigation

// Impor fungsi-fungsi yang dibutuhkan dari network-data.js
import { getUserLogged, putAccessToken, getAccessToken } from './utils/network-data'; //

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error && data) {
          setAuthedUser(data);
        } else {
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
    // Menampilkan pesan loading yang lebih konsisten dengan header
    return (
      <div className="app-container"> {/* */}
        <header> {/* */}
          <h1>
            <Link to="/" className="app-title-link bold-underline">Aplikasi Catatan</Link> {/* */}
          </h1>
        </header>
        <main> {/* */}
          <p style={{ textAlign: 'center', padding: '20px', fontSize: '1.2em' }}>Memuat aplikasi...</p>
        </main>
      </div>
    );
  }

  if (authedUser === null) {
    return (
      <div className="app-container"> {/* */}
        <header> {/* */}
          <h1>
            <Link to="/" className="app-title-link bold-underline">Aplikasi Catatan</Link> {/* */}
          </h1>
          {/* Tidak menampilkan Navigation component di sini, tapi bisa link Login/Register sederhana jika mau */}
          <nav>
            <Link to="/login" className="nav-link nav-link--lg" style={{marginRight: '10px'}}>Login</Link> {/* */}
            <Link to="/register" className="nav-link nav-link--lg">Register</Link> {/* */}
          </nav>
        </header>
        <main> {/* */}
          <Routes>
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Jika pengguna sudah login
  return (
    <div className="app-container"> {/* */}
      <header> {/* */}
        <h1>
          <Link to="/" className="app-title-link bold-underline">Aplikasi Catatan</Link> {/* */}
        </h1>
        {/* Menggunakan komponen Navigation yang sudah diimpor */}
        <Navigation logout={onLogout} name={authedUser.name} />
      </header>
      <main> {/* */}
        <Routes>
          <Route path="/" element={<NoteListPage />} />
          <Route path="/notes/new" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;