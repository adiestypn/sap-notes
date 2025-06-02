import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import { FiPlus } from 'react-icons/fi';
import useTranslation from '../hooks/useTranslation';

function NoteListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(); 
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
  }, []); // 

  const handleDelete = async (id) => {
    setLoading(true); 
    const { error: deleteError } = await deleteNote(id); 
    if (!deleteError) {

      const { error: fetchError, data: updatedNotes } = await getActiveNotes();
      if (!fetchError) {
        setNotes(updatedNotes); 
      } else {
        console.error("Gagal mengambil catatan setelah menghapus.", fetchError);
        alert("Gagal memuat ulang catatan setelah penghapusan.");
      }
    } else {
      alert("Gagal menghapus catatan.");
      console.error("Error saat menghapus catatan:", deleteError);
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
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return <main><p>{t('loadingNotes')}</p></main>;
  }

  return (
    <main>
      <h2>{t('activeNotesTitle')}</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={keyword}
          onChange={handleSearchChange}
        />
      </div>
      <NoteList
        notes={filteredNotes}
      />
      <div className="homepage__action">
        <button className="action tooltip" onClick={() => navigate('/notes/new')}>
          <FiPlus />
          <span className="tooltip-text">{t('addNoteTooltip')}</span>
        </button>
      </div>
    </main>
  );
}

export default NoteListPage;
