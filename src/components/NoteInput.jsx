import React from 'react';
import { FiCheck, FiPlus} from 'react-icons/fi';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const input = event.target.value;
    if (input.length <= 50) {
      this.setState({ title: input });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({
      body: event.target.value,
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <>
        <form
          id="note-form"
          className="note-input"
          onSubmit={this.onSubmitEventHandler}
        >
          <input
            type="text"
            placeholder="Judul"
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
          />
          <textarea
            placeholder="Isi catatan..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
          ></textarea>
        </form>

        {/* Tombol simpan mengambang */}
        <div className="add-new-page__action">
          <button
            type="submit"
            form="note-form"
            className="action tooltip"
          >
            <FiCheck />
            <span className="tooltip-text">Simpan</span>
          </button>
        </div>
      </>
    );
  }
}

export default NoteInput;