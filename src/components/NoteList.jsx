import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import useTranslation from '../hooks/useTranslation'; // Impor hook

function NoteList({ notes, onDelete, onArchive }) {
  const { t } = useTranslation(); // Panggil hook

  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{t('noNotes')}</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          {...note}
          onDelete={onDelete}
          onArchive={onArchive}
          // Anda mungkin perlu meneruskan 't' ke NoteItem jika teks tombol aksi ada di sana
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func, 
  onArchive: PropTypes.func, 
};

export default NoteList;
