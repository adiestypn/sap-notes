// src/pages/AddNotePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/network-data'; // Pastikan diimpor dari api.js
import useTranslation from '../hooks/useTranslation';

function AddNotePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Gunakan satu handler ini saja
  async function onAddNoteHandler(noteData) {
    const { error, data } = await addNote(noteData);
    if (!error) {
      navigate('/');
    } else {
      alert(t('failedAddNote')); // Gunakan t()
    }
  }

  return (
    <main>
      {/* Anda mungkin perlu meneruskan 't' ke NoteInput jika placeholder ada di sana */}
      <NoteInput addNote={onAddNoteHandler} />
    </main>
  );
}
export default AddNotePage;