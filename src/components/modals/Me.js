import React, {Component} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './Me.css';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
// import EditProject from '../modals/EditProject'
// import {Card, CardHeader, CardText, CardActions, LinearProgress} from 'material-ui';
// import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
// import './ProjectCard.css';
// import '../App.css';
// import FloatingActionButton from 'material-ui/FloatingActionButton';

// import EditButton from './EditButton';
// import EditProject from '../modals/EditProject'

export default class Me extends React.Component {

  constructor() {
    super();
    //this.setState = this.setState.bind(this);
    this.state = {
    };
  }

  render() {
    return (
      <div className="followers-page">
        <p>Hello <br/>{this.props.firstName}
        </p>
        <hr/>
      </div>)
  }
}
