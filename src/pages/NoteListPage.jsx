import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getAllNotes, deleteNote, archiveNote, unarchiveNote, getNote } from '../utils/local-data';
import { FiPlus } from 'react-icons/fi';

function NoteListPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState(getAllNotes());
  const [keyword, setKeyword] = React.useState('');

  const handleDelete = (id) => {
    deleteNote(id);
    setNotes(getAllNotes());
  };

  const handleArchive = (id) => {
    const note = getNote(id);
    if (note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    setNotes(getAllNotes());
  };

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  // Filter berdasarkan keyword & non-arsip
  const filteredNotes = notes.filter((note) =>
    !note.archived &&
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main>
      <h2>Catatan Aktif</h2>

      {/* 🔍 Form Cari */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={keyword}
          onChange={handleSearchChange}
        />
      </div>

      {/* 📋 Daftar Catatan */}
      <NoteList
        notes={filteredNotes}
      />

      {/* ➕ Tombol Tambah */}
      <div className="homepage__action">
        <button className="action tooltip" onClick={() => navigate('/tambah')}>
            <FiPlus />
            <span className="tooltip-text">Tambah</span>
        </button>
      </div>

    </main>
  );
}

export default NoteListPage;
