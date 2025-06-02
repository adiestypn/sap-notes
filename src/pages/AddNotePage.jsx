// src/pages/AddNotePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/api'; // Pastikan diimpor dari api.js

function AddNotePage() {
  const navigate = useNavigate();

  // Gunakan satu handler ini saja
  async function onAddNoteHandler(noteData) { // noteData akan berisi { title, body } dari NoteInput
    const { error, data } = await addNote(noteData); // Panggil addNote dari api.js

    if (!error) {
      navigate('/'); // Navigasi jika berhasil
    } else {
      // Anda bisa menambahkan penanganan error di sini, misalnya menampilkan alert
      console.error("Gagal menambahkan catatan:", data ? data.message : "Error tidak diketahui");
      alert("Gagal menambahkan catatan."); // Atau pesan error yang lebih spesifik jika ada
    }
  }

  return (
    <main>
      {/* Kirim onAddNoteHandler ke NoteInput */}
      <NoteInput addNote={onAddNoteHandler} />
    </main>
  );
}

export default AddNotePage;