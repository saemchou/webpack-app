import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';
import NoteStore from '../stores/NoteStore.js';
import NoteActions from '../actions/NoteActions.js';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // point at the right context (defaults to `undefined` in strict mode).
    this.setState(state);
  }

  render () {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={this.state.notes}
               onEdit={this.editNote}
               onDelete={this.deleteNote}/>
      </div>
    )
  }

  addNote = () => {
    NoteActions.create({task: 'New task'});
  }

  editNote = (id, task) => {
    NoteActions.update({id, task});
  }

  deleteNote = (id) => {
    NoteActions.delete(id);
  }
};