import React from 'react';
import Note from './Note.jsx';


export default class Notes extends React.Component {
  render() {
    var notes = this.props.notes;
    console.log(notes);
    return (
        <div>
          <ul>{notes.map(this.renderNote)}</ul>
        </div>
    )
  }
  renderNote (note) {
    return (
        <li key={note.id}>
          <Note task={note.task}/>
        </li>
    );
  }
}