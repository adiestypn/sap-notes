// src/components/NoteInput.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import useTranslation from '../hooks/useTranslation'; // Pastikan path ini benar

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
    // Validasi sisi klien untuk field kosong dihilangkan
    // if (title.trim() === '' || body.trim() === '') {
    //   alert(t('emptyNoteFieldsError') || 'Judul dan isi catatan tidak boleh kosong!');
    //   return;
    // }
    addNote({ title, body }); // Langsung panggil addNote
    
    // Reset fields setelah mencoba submit, terlepas dari berhasil atau tidak di API
    // Anda bisa memindahkan ini ke dalam blok .then() atau setelah await jika addNote mengembalikan promise
    // dan Anda hanya ingin reset jika API call berhasil.
    // Namun, untuk saat ini, kita reset langsung.
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
