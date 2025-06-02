// src/pages/DetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import { FiArchive, FiInbox, FiTrash2 } from 'react-icons/fi';
import useTranslation from '../hooks/useTranslation'; // Pastikan impor ini ada dan path-nya benar

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Panggil hook di sini
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNoteDetail = async () => {
      setLoading(true);
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      } else {
        console.error("Gagal mengambil detail catatan:", data);
        setNote(null);
      }
      setLoading(false);
    };

    fetchNoteDetail();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(t('confirmDelete'))) { // Teks konfirmasi juga diterjemahkan
      setLoading(true);
      const { error } = await deleteNote(id);
      setLoading(false);
      if (!error) {
        navigate('/');
      } else {
        alert(t('failedDelete')); // Teks alert juga diterjemahkan
      }
    }
  };

  const handleArchive = async () => {
    if (!note) return;
    setLoading(true);
    let error;
    if (note.archived) {
      const response = await unarchiveNote(id);
      error = response.error;
    } else {
      const response = await archiveNote(id);
      error = response.error;
    }
    setLoading(false);
    if (!error) {
      // Refresh data catatan setelah aksi atau navigasi
      const { error: fetchError, data: updatedNoteData } = await getNote(id);
      if (!fetchError) {
        setNote(updatedNoteData); // Update state note lokal
      } else { // Jika gagal fetch, mungkin navigasi kembali atau tampilkan pesan
        navigate('/'); // Contoh: navigasi ke home jika gagal refresh detail
      }
    } else {
      alert(note.archived ? t('failedUnarchive') : t('failedArchive')); // Teks alert diterjemahkan
    }
  };


  if (loading) {
    return <main><p style={{ padding: '32px', textAlign: 'center' }}>{t('noteDetailLoading')}</p></main>;
  }

  if (!note) {
    return <main><p style={{ padding: '32px', textAlign: 'center' }}>{t('noteNotFound')}</p></main>;
  }

  return (
    <main className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body" dangerouslySetInnerHTML={{ __html: note.body }}></div>

      <div className="detail-page__action">
        <button className="action tooltip" onClick={handleArchive} title={note.archived ? t('unarchiveAction') : t('archiveAction')}>
          {note.archived ? <FiInbox /> : <FiArchive />}
          <span className="tooltip-text">{note.archived ? t('unarchiveAction') : t('archiveAction')}</span>
        </button>
        <button className="action tooltip" onClick={handleDelete} title={t('deleteAction')}>
          <FiTrash2 />
          <span className="tooltip-text">{t('deleteAction')}</span>
        </button>
      </div>
    </main>
  );
}

export default DetailPage;
