import React, {Component} from 'react';
import api from '../../api';
import TaskCard from '../elements/TaskCard';
import CreateTask from '../modals/CreateTask';
import AddButton from '../elements/AddButton';
import Paper from 'material-ui/Paper';
import Conversation from '../elements/Conversation'
import './Project.css';

const style = {
  margin: '20% 35%',
  textAlign: 'center',
  display: 'inline-block',
  padding: '2rem',
  opacity: 0.8
};

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      open: false,
      isAdmin: false
    };
  }


  componentDidMount() {
    this.fetchData()
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  _handleFormSubmitted = () => {
    this.setState({createTask : false})
  }


  fetchData = () => {
      api.getTasks(this.props.params.id)
      .then(res => {
        this.setState({
          tasks: res.body
        })
      })
      .catch(console.error)

      Promise.all([
        api.getProjects(this.props.params.id),
        api.getMe(localStorage.token)
      ])
      .then(data => {
        var project = data[0].body[0];
        var user = data[1].body;
        this.setState({
          isAdmin: user.users_id === project.adminUserId,
          userId: user.users_id,
          projectTitle: project.title,
          firstName: user.users_firstName
        })
      })

  }

  _createTaskForm = () =>{
    this.setState({
      createTask: true
    })
  }

  render() {
    let { tasks, projectTitle } = this.state;

    return (
      <div className="tasks">

         { tasks.length !== 0 ? tasks.map(b =>
           <div className="single-proj col-large-3 col-medium-6 col-small-12">
            <TaskCard
              projectId={this.props.params.id}
              isAdmin={this.state.isAdmin}
              userId={this.state.userId}
              key={b.id}
              id={b.id}
              title={b.title}
              description={b.description}
              deadline={b.deadline}
              priority={b.priority}
              completed={b.completed}
              ReRenderProject={this.fetchData}
            />
            </div>
          ) : <Paper style={style} className="col-large-6" zDepth={2}><strong>NO TASKS YET</strong></Paper> }


          <Conversation projectId={this.props.params.id} username={this.state.firstName} />

        {this.state.isAdmin?  <AddButton buttonClick={this._createTaskForm} /> : null}
        {this.state.createTask ? <CreateTask onCreate={this.fetchData}
          projectId={this.props.params.id}
          openState={this.handleOpen} closeState={this.handleClose}
          closeForm={this._handleFormSubmitted}/> : null}

      </div>
    );
  }

}
//         <Conversation projectId={this.props.params.id} userId={this.state.userId} />


// {auth.isLoggedIn() ? <Link to={`/projects`}> <ReturnButton projectTitle={projectTitle}/> </Link> : null}
