import AltContainer from 'alt-container';
import uuid from 'node-uuid';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneStore from '../stores/LaneStore.js';
import LaneActions from '../actions/LaneActions.js';

export default class App extends React.Component {

  render () {
    return (
      <div>
        <button className="add-lane" onClick={this.addLane}>+</button>

          <AltContainer
              stores={[LaneStore]}
              inject={{
                items: () => LaneStore.getState().lanes || []
              }}
          >
            <Lanes onEdit={this.editLane} onDelete={this.deleteLane}/>
          </AltContainer>
      </div>
    )
  }

  addLane = () => {
    LaneActions.create({task: 'New lane'});
  }

  editLane = (id, task) => {
    LaneActions.update({id, task});
  }

  deleteLane = (id) => {
    LaneActions.delete(id);
  }
};