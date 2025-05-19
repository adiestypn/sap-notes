import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NoteListPage from './pages/NoteListPage';
import AddNotePage from './pages/AddNotePage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';


function App() {
  return (
    <div className="app-container">
      {/* ✅ HEADER UMUM */}
      <header>
        <h1>
          <Link to="/" className="app-title-link">Aplikasi Catatan</Link>
        </h1>
        <nav>
              <Link to="/arsip" style={{ marginLeft: '16px' }}>Arsip</Link></nav>
      </header>

      {/* ✅ HALAMAN UTAMA */}
      <Routes>
        <Route path="/" element={<NoteListPage />} />
        <Route path="/tambah" element={<AddNotePage />} />
        <Route path="/catatan/:id" element={<DetailPage />} />
        <Route path="/arsip" element={<ArchivePage />} /> 
      </Routes>
    </div>
  );
}

export default App;
