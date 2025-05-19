import React from 'react';
import NoteList from '../components/NoteList';
import { getArchivedNotes } from '../utils/local-data';

function ArchivePage() {
  const [notes, setNotes] = React.useState(getArchivedNotes());
  const [keyword, setKeyword] = React.useState('');

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main>
      <h2>Catatan Arsip</h2>

      {/* 🔍 Bar pencarian */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari catatan arsip..."
          value={keyword}
          onChange={handleSearchChange}
        />
      </div>

      {/* ❌ Hilangkan tombol karena tidak kirim handler */}
      <NoteList
        notes={filteredNotes}
        // Tidak kirim onDelete & onArchive = tombol tidak muncul
      />
    </main>
  );
}

export default ArchivePage;
