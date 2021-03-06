import React, {Component} from 'react';
import api from '../../api';
import ProjectCard from '../elements/ProjectCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import CreateProject from '../modals/CreateProject';
import Paper from 'material-ui/Paper';
import './Home.css';
import '../App.css'

const noProjStyle = {
  margin: '20% 35%',
  textAlign: 'center',
  display: 'inline-block',
  padding: '2rem',
  opacity: 0.8
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      open:false,
      me: null

    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    api.getMe(localStorage.token)
    .then(yoSoy => {
      this.setState({
        me : yoSoy.body.users_id
      })
    })
    .then(() => api.getProjectsList())
    .then(data => {
      this.setState({
        projects:data.body
      })
    })

  }

  _createProjectForm = () => {
    this.setState({
      createProject: true
    })
  }


  render() {
    let { projects } = this.state;

    return (
      <div className="home">
        { projects.length !== 0 ? projects.map(p =>
          <div className="single-proj col-large-4 col-medium-6 col-small-12">
            <ProjectCard
              isAdmin={p.adminUserId===this.state.me}
              projectAdmin={p.adminUserId}
              key={p.id}
              id={p.id}
              progress={p.progressPct}
              title={p.title}
              deadline={p.deadline}
              description={p.description}
              editProject={this._fetchData}
            />
          </div>
        ) : <Paper style={noProjStyle} className="col-large-6 paper-frame" zDepth={2}><strong>NO PROJECTS YET</strong></Paper>}

        {auth.isLoggedIn() ?  <AddButton buttonClick={this.handleOpen}  /> : null}
        {this.state.open ? <CreateProject onCreate={() => {this._fetchData(); this.handleClose()}} openState={this.handleOpen} closeState={this.handleClose}/> : null}

      </div>
    );
  }

}
