// src/components/NoteItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NoteItemBody from './NoteItemBody';
// import useTranslation from '../hooks/useTranslation'; // 1. Komentari impor ini sementara

function NoteItem({ id, title, body, createdAt, archived, onDelete, onArchive }) {
  // const { t } = useTranslation(); // 2. Komentari pemanggilan hook ini sementara

  return (
    <div className="note-item">
      <NoteItemBody
        title={<Link to={`/notes/${id}`} className="bold-underline">{title}</Link>}
        body={body}
        date={createdAt}
      />

      {(onDelete || onArchive) && (
        <div className="note-item__action">
          {onArchive && (
            <button onClick={() => onArchive(id)}>
              {/* 3. Ganti dengan teks statis sementara */}
              {archived ? 'Unarchive (Test)' : 'Archive (Test)'}
            </button>
          )}
          {onDelete && (
            // 3. Ganti dengan teks statis sementara
            <button onClick={() => onDelete(id)}>{'Delete (Test)'}</button>
          )}
        </div>
      )}
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
};

export default NoteItem;
