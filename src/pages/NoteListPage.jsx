import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import { FiPlus } from 'react-icons/fi';

function NoteListPage() { // <--- AWAL FUNGSI UTAMA
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(searchParams.get('keyword') || '');
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchActiveNotes = async () => {
      setLoading(true);
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      } else {
        console.error("Gagal mengambil catatan aktif:", data);
      }
      setLoading(false);
    };

    fetchActiveNotes();
  }, []);

  // Pastikan fungsi-fungsi ini ada di dalam NoteListPage
  const handleDelete = async (id) => {
    setLoading(true);
    const { error } = await deleteNote(id);
    if (!error) {
      const { error: fetchError, data: updatedNotes } = await getActiveNotes();
      if (!fetchError) {
        setNotes(updatedNotes);
      } else {
        console.error("Gagal mengambil catatan setelah menghapus.");
      }
    } else {
      alert("Gagal menghapus catatan.");
    }
    setLoading(false);
  };

  const handleArchive = async (id) => {
    setLoading(true);
    const { error } = await archiveNote(id);
    if (!error) {
      const { error: fetchError, data: updatedNotes } = await getActiveNotes();
      if (!fetchError) {
        setNotes(updatedNotes);
      } else {
        console.error("Gagal mengambil catatan setelah mengarsipkan.");
      }
    } else {
      alert("Gagal mengarsipkan catatan.");
    }
    setLoading(false);
  };

  const handleSearchChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const filteredNotes = notes.filter((note) =>
    // !note.archived && // Mungkin tidak perlu jika getActiveNotes sudah memfilter
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return <main><p>Memuat catatan...</p></main>; // Ini harus di dalam fungsi
  }

  return ( // Ini juga harus di dalam fungsi
    <main>
      <h2>Catatan Aktif</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={keyword}
          onChange={handleSearchChange}
        />
      </div>
      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete} // Jangan lupa teruskan props ini
        onArchive={handleArchive} // Jangan lupa teruskan props ini
      />
      <div className="homepage__action">
        <button className="action tooltip" onClick={() => navigate('/notes/new')}>
          <FiPlus />
          <span className="tooltip-text">Tambah</span>
        </button>
      </div>
    </main>
  );
} // <--- AKHIR FUNGSI UTAMA

export default NoteListPage;