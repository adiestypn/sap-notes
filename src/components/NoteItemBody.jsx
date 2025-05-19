import React from 'react';
import { showFormattedDate } from '../utils';

function NoteItemBody({ title, body, date }) {
  return (
    <div className="note-item__body">
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__createdAt">{showFormattedDate(date)}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

export default NoteItemBody;
