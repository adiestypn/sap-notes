// src/pages/DetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Impor getNote dari network-data.js, bukan local-data.js
// Juga impor fungsi lain yang mungkin tetap relevan dari network-data.js jika aksi detail juga lewat API
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import { FiArchive, FiInbox, FiTrash2 } from 'react-icons/fi';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null); // State untuk menyimpan detail catatan
  const [loading, setLoading] = React.useState(true); // State untuk loading

  React.useEffect(() => {
    const fetchNoteDetail = async () => {
      setLoading(true);
      const { error, data } = await getNote(id); // Panggil getNote dari network-data.js
      if (!error) {
        setNote(data);
      } else {
        console.error("Gagal mengambil detail catatan:", data);
        setNote(null); // Set note ke null jika gagal
      }
      setLoading(false);
    };

    fetchNoteDetail();
  }, [id]); // Tambahkan id sebagai dependency agar useEffect dijalankan lagi jika id berubah

  // Fungsi handleDelete dan handleArchive mungkin perlu dipastikan
  // apakah akan menggunakan versi dari network-data.js atau local-data.js
  // Berdasarkan konteks, sebaiknya dari network-data.js
  const handleDelete = async () => {
    // Pastikan pengguna mengonfirmasi sebelum menghapus
    if (window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      setLoading(true);
      const { error } = await deleteNote(id); // Gunakan deleteNote dari network-data.js
      setLoading(false);
      if (!error) {
        navigate('/');
      } else {
        alert("Gagal menghapus catatan.");
      }
    }
  };

  const handleArchive = async () => {
    if (!note) return; // Pastikan note ada sebelum melakukan aksi
    setLoading(true);
    if (note.archived) {
      const { error } = await unarchiveNote(id); // Gunakan unarchiveNote dari network-data.js
      setLoading(false);
      if (!error) {
        // Idealnya, setelah unarchive, navigasi ke halaman yang sesuai atau refresh data
        navigate('/'); // Atau ke halaman arsip jika ada
      } else {
        alert("Gagal memindahkan catatan dari arsip.");
      }
    } else {
      const { error } = await archiveNote(id); // Gunakan archiveNote dari network-data.js
      setLoading(false);
      if (!error) {
        navigate('/');
      } else {
        alert("Gagal mengarsipkan catatan.");
      }
    }
  };

  if (loading) {
    return <main><p style={{ padding: '32px', textAlign: 'center' }}>Memuat detail catatan...</p></main>;
  }

  if (!note) {
    return <main><p style={{ padding: '32px', textAlign: 'center' }}>Catatan tidak ditemukan atau gagal dimuat.</p></main>;
  }

  return (
    <main className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      {/* API mungkin mengembalikan body sebagai HTML, jika tidak, render seperti biasa */}
      <div className="detail-page__body" dangerouslySetInnerHTML={{ __html: note.body }}></div>
      {/* Atau jika body adalah plain text: <div className="detail-page__body">{note.body}</div> */}


     <div className="detail-page__action">
        <button className="action tooltip" onClick={handleArchive}>
            {note.archived ? <FiInbox /> : <FiArchive />}
            <span className="tooltip-text">{note.archived ? 'Pindahkan' : 'Arsipkan'}</span>
        </button>
        <button className="action tooltip" onClick={handleDelete}>
            <FiTrash2 />
            <span className="tooltip-text">Hapus</span>
        </button>
    </div>
    </main>
  );
}

export default DetailPage;