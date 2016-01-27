import React from 'react';

export default class Note extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      editing: false
    }
  }

  render() {
    if(this.state.editing) {
      return this.renderEdit();
    }
    return this.renderNote();
  }

  renderNote = () => {
    const onDelete = this.props.onDelete

    return <div onClick={this.edit}>
      {this.props.task}
      {onDelete ? this.renderDelete() : null}
    </div>;
  }

  edit = () => {
    this.setState({
      editing: true
    });
  }

  renderEdit = () => {
    return <input type="text"
                  autoFocus={true}
                  defaultValue={this.props.task}
                  onBlur={this.finishEdit}
                  onKeyPress={this.checkEnter}
    />;
  }

  renderDelete = () => {
    return <button className="delete" onClick={this.props.onDelete}>x</button>;
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    this.props.onEdit(e.target.value);
    this.setState({
      editing: false
    });
  }
}