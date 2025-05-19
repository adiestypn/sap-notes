import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, onArchive }) {
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>Tidak ada catatan </p>
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
        />
      ))}
    </div>
  );
}

export default NoteList;
