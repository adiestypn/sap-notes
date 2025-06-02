// src/pages/ArchivePage.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
// Ubah impor getArchivedNotes ke network-data.js
import { getArchivedNotes, unarchiveNote /* Jika ingin ada tombol unarchive di sini */ } from '../utils/network-data';
import useTranslation from '../hooks/useTranslation'; 
// Anda mungkin juga butuh useNavigate jika ada aksi seperti unarchive dari halaman ini
// import { useNavigate } from 'react-router-dom';

function ArchivePage() {
  const { t } = useTranslation();
  // const navigate = useNavigate(); // Uncomment jika perlu navigasi
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(searchParams.get('keyword') || '');
  const [notes, setNotes] = React.useState([]); // Inisialisasi dengan array kosong
  const [loading, setLoading] = React.useState(true); // Tambahkan state loading

  React.useEffect(() => {
    const fetchArchivedNotes = async () => {
      setLoading(true);
      const { error, data } = await getArchivedNotes(); // Panggil dari network-data.js
      if (!error) {
        setNotes(data);
      } else {
        console.error("Gagal mengambil catatan arsip:", data);
        setNotes([]); // Atau tangani error sesuai kebutuhan
      }
      setLoading(false);
    };

    fetchArchivedNotes();
  }, []); // Jalankan sekali saat komponen dimuat

  const handleSearchChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  // Fungsi untuk unarchive jika ingin ada tombolnya di halaman ini
  // const handleUnarchive = async (id) => {
  //   setLoading(true);
  //   const { error } = await unarchiveNote(id);
  //   if (!error) {
  //     // Ambil ulang daftar catatan arsip setelah unarchive
  //     const { error: fetchError, data: updatedNotes } = await getArchivedNotes();
  //     if (!fetchError) {
  //       setNotes(updatedNotes);
  //     } else {
  //       console.error("Gagal memuat ulang catatan arsip.");
  //     }
  //   } else {
  //     alert("Gagal memindahkan catatan dari arsip.");
  //   }
  //   setLoading(false);
  // };

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
          placeholder={t('searchPlaceholder')} // atau searchArchivedPlaceholder
          value={keyword}
          onChange={handleSearchChange}
        />
      </div>
      <NoteList
        notes={filteredNotes}
        // onUnarchive={handleUnarchive} // Teruskan fungsi ini jika ada tombol unarchive di NoteItem untuk konteks arsip
        // onDelete={...} // Jika ingin ada tombol delete di halaman arsip
      />
    </main>
  );
}

export default ArchivePage;