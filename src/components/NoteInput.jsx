import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import useTranslation from '../hooks/useTranslation'; 

function NoteInput({ addNote }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleCharCount, setTitleCharCount] = useState(0);

  const onTitleChangeEventHandler = (event) => {
    const newTitle = event.target.value;
    if (newTitle.length <= 50) {
      setTitle(newTitle);
      setTitleCharCount(newTitle.length);
    }
  };

  const onBodyChangeEventHandler = (event) => {
    setBody(event.target.value);
  };

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    addNote({ title, body }); 
    setTitle('');
    setBody('');
    setTitleCharCount(0);
  };

  return (
    <>
      <form
        id="note-form"
        className="note-input"
        onSubmit={onSubmitEventHandler}
      >
        <div className="note-input__title-wrapper">
          <input
            type="text"
            placeholder={t('titleInputPlaceholder')}
            value={title}
            onChange={onTitleChangeEventHandler}
            aria-label={t('titleInputPlaceholder')}
          />
        </div>
        <textarea
          placeholder={t('bodyInputPlaceholder')}
          value={body}
          onChange={onBodyChangeEventHandler}
          aria-label={t('bodyInputPlaceholder')}
          rows="5"
        ></textarea>
      </form>

      <div className="add-new-page__action">
        <button
          type="submit"
          form="note-form"
          className="action tooltip"
          title={t('saveNoteTooltip')}
        >
          <FiCheck />
          <span className="tooltip-text">{t('saveNoteTooltip')}</span>
        </button>
      </div>
    </>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
