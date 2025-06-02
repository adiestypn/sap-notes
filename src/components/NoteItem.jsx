import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NoteItemBody from './NoteItemBody';

function NoteItem({ id, title, body, createdAt, archived, onDelete, onArchive }) {
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
              {archived ? t('unarchiveAction') : t('archiveAction')}
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(id)}>{t('deleteAction')}</button>
          )}
        </div>
      )}
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
};

export default NoteItem;
