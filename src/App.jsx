import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NoteListPage from './pages/NoteListPage';
import AddNotePage from './pages/AddNotePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="app-container">
      {/* ✅ HEADER UMUM */}
      <header>
        <h1>Aplikasi Catatan</h1>
      </header>

      {/* ✅ HALAMAN UTAMA */}
      <Routes>
        <Route path="/" element={<NoteListPage />} />
        <Route path="/tambah" element={<AddNotePage />} />
        <Route path="/catatan/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
