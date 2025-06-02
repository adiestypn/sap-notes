import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getArchivedNotes } from '../utils/network-data';
import useTranslation from '../hooks/useTranslation'; 
import { useNavigate } from 'react-router-dom';

function ArchivePage() {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(searchParams.get('keyword') || '');
  const [notes, setNotes] = React.useState([]); 
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    const fetchArchivedNotes = async () => {
      setLoading(true);
      const { error, data } = await getArchivedNotes(); 
      if (!error) {
        setNotes(data);
      } else {
        console.error("Gagal mengambil catatan arsip:", data);
        setNotes([]); 
      }
      setLoading(false);
    };

    fetchArchivedNotes();
  }, []); 

  const handleSearchChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };


  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

if (loading) {
    return <main><p style={{ padding: '32px', textAlign: 'center' }}>{t('loadingNotes')}</p></main>; // atau buat key baru loadingArchivedNotes
  }

  return (
    <main>
      <h2>{t('archivedNotesTitle')}</h2>
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
    </main>
  );
}

export default ArchivePage;