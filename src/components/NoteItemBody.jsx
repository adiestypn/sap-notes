import React from 'react';
import PropTypes from 'prop-types';
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

NoteItemBody.propTypes = {
  title: PropTypes.node.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};


export default NoteItemBody;
