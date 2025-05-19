import React from 'react';
import NoteList from './NoteList';
import {
  getAllNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getNote,
} from '../utils/local-data';

import NoteInput from './NoteInput';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      keyword: '',
    };


    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
  addNote({ title, body });
  this.setState({ notes: getAllNotes() });
  }


  onDeleteHandler(id) {
  deleteNote(id);
  this.setState({ notes: getAllNotes() });
}


  onArchiveHandler(id) {
  const note = getNote(id);
  if (note.archived) {
    unarchiveNote(id);
  } else {
    archiveNote(id);
  }
  this.setState({ notes: getAllNotes() });
}

  onSearchChangeHandler(event) {
  this.setState({ keyword: event.target.value });
}
getFilteredNotes(isArchived) {
  const { notes, keyword } = this.state;
  return notes.filter((note) =>
    note.archived === isArchived &&
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );
}



  render() {
    return (
      <div className="note-app">
        <div className="note-app__header">
          <h1>Aplikasi Catatan</h1>
          <input
            type="text"
            className="note-search"
            placeholder="Cari catatan..."
            value={this.state.keyword}
            onChange={this.onSearchChangeHandler}
          />
        </div>
        <div className="note-app__body">
        <h2>Tambah Catatan</h2>
        <NoteInput addNote={this.onAddNoteHandler} />
        <h2>Catatan Aktif</h2>
        <NoteList
          notes={this.getFilteredNotes(false)} // hanya catatan aktif yg cocok keyword
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        <h2>Catatan Arsip</h2>
        <NoteList
          notes={this.getFilteredNotes(true)} // hanya catatan arsip yg cocok keyword
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
        </div>
      </div>
      );
   } 
}

export default NoteApp;
