import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/network-data'; 
import useTranslation from '../hooks/useTranslation';

function AddNotePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();


  async function onAddNoteHandler(noteData) {
    const { error, data } = await addNote(noteData);
    if (!error) {
      navigate('/');
    } else {
      alert(t('failedAddNote')); 
    }
  }

  return (
    <main>
      <NoteInput addNote={onAddNoteHandler} />
    </main>
  );
}
export default AddNotePage;