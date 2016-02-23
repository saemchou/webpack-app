import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];

    this.exportPublicMethods({
      get: this.get.bind(this)
    });
  }

  get(ids) {
    return (ids || []).map(
        (id) => this.notes.filter((note) => note.id === id)
    ).filter((a) => a).map((a) => a[0]);
  }

  create(note) {
    const notes = this.notes;

    note.id = uuid.v4();
    this.setState({
      notes: notes.concat(note)
    });
  }

  update({id, task}) {
    const notes = this.notes.map((note) => {
      if(note.id === id) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  }

  delete(id) {
    const notes = this.notes.filter((note) => note.id !== id);
    this.setState({notes});
  }
}

export default alt.createStore(NoteStore, 'NoteStore');