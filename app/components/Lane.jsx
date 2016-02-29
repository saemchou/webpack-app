import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Editable from './Editabale.jsx';

export default class Lane extends React.Component {

  constructor(props) {
    super(props);

    const id = props.lane.id;

    this.editName = this.editName.bind(this, id);
    this.addLane = this.addLane.bind(this, id);
    this.deleteLane = this.deleteLane.bind(this, id);
  }

  render() {
    const {lane, ...props} = this.props;
    return (
        <div {...props}>
          <div className="lane-header">
            <Editable
                className="lane-name"
              value={lane.name}
              onEdit={this.editName}
            />
            <div className="lane-add-note">
              <button onClick={this.addLane}>+</button>
            </div>
          </div>


          <AltContainer
              stores={[NoteStore]}
              inject={{
                items: () => NoteStore.get(lane.notes) || []
              }}>

            <Notes onEdit={this.editLane} onDelete={this.deleteLane} />

          </AltContainer>
        </div>
    )
  }

  editName(id, name) {
    if (name) {
      LaneActions.update({id, name});
    }
    else {
      LaneActions.delete(id);
    }
  }

  addLane(laneId) {
    NoteActions.create({task: 'New task'});
    LaneActions.attachToLane({laneId});
  }

  deleteLane(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }
}
