import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/local-data';

function AddNotePage() {
  const navigate = useNavigate();

  const handleAddNote = ({ title, body }) => {
    addNote({ title, body });
    navigate('/'); // kembali ke halaman utama
  };

  return (
    <main>
      <NoteInput addNote={handleAddNote} />
    </main>
  );
}

export default AddNotePage;
