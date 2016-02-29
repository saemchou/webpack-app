import React from 'react';
import Lane from './Lane.jsx';

export default class Lanes extends React.Component {

  render() {
    const lanes = this.props.items;

    return(
        <div className="lanes">
          <hr/>
          {lanes.map(this.renderLane)}
        </div>
    )
  }

  renderLane(lane) {
    if (lane != null) {
      return <Lane className="lane" key={lane.id} lane={lane}/>
    }
  }
}
