import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';
import { FiArchive, FiInbox, FiTrash2 } from 'react-icons/fi';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  if (!note) {
    return <p style={{ padding: '32px' }}>Catatan tidak ditemukan.</p>;
  }

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

    const handleArchive = () => {
        if (note.archived) {
            unarchiveNote(id);
        } else {
            archiveNote(id);
        }

        // ✅ Selalu kembali ke halaman utama
        navigate('/');
        };



  return (
    <main className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>

      <div className="detail-page__action">
        <button className="button" onClick={handleArchive}>
          {note.archived ? <FiInbox /> : <FiArchive />}
        </button>
        <button className="button" onClick={handleDelete}>
          <FiTrash2 />
        </button>
      </div>
    </main>
  );
}

export default DetailPage;
