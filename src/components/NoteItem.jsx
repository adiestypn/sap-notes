import React from 'react';
import { Link } from 'react-router-dom';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils';

function NoteItem({ id, title, body, createdAt, archived, onDelete, onArchive }) {
  return (
    <div className="note-item">
      {/* ✅ Judul dibungkus Link ke detail */}
      <div className="note-item__body">
        <h3 className="note-item__title">
          <Link to={`/catatan/${id}`}>{title}</Link>
        </h3>
        <p className="note-item__date">{showFormattedDate(createdAt)}</p>
        <p className="note-item__body">{body}</p>
      </div>

     {onDelete && onArchive && (
      <div className="note-item__action">
        <button onClick={() => onArchive(id)}>
          {archived ? 'Pindahkan' : 'Arsipkan'}
        </button>
        <button onClick={() => onDelete(id)}>Hapus</button>
      </div>
)}
    </div>
  );
}

export default NoteItem;
