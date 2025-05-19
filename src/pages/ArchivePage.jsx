import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getArchivedNotes } from '../utils/local-data';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(searchParams.get('keyword') || '');
  const [notes, setNotes] = React.useState(getArchivedNotes());

  

  const handleSearchChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
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
