import React from 'react';
import { Link } from 'react-router-dom';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils';

function NoteItem({ id, title, body, createdAt, archived, onDelete, onArchive }) {
  return (
    <div className="note-item">
      <NoteItemBody
        title={<Link to={`/notes/${id}`} className="bold-underline">{title}</Link>}
        body={body}
        date={createdAt}
      />

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
