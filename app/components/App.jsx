import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    }
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

  editNote = (id, task) => {
    const notes = this.state.notes.map((note) => {
      if(note.id === id) {
        note.task = task;
      }
      return note;
    });

    this.setState({notes});
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== id)
    });
  }

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }
};