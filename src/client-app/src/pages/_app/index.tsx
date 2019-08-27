import axios from 'axios';
import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';

import { IActivity } from '../../models/';

interface IState {
  activities:IActivity[];
}


class App extends Component<{},IState> {
  readonly state : IState = {
    activities: []
  };

  componentDidMount() {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response => {
      this.setState({
        activities: response.data
      });
    });
  }

  public render() {
    const { activities } = this.state;

    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>              
          <List>
            {activities.map((activitiy: IActivity) => (
              <List.Item key={activitiy.id}>{activitiy.title}</List.Item>
            ))}
          </List>        
      </div>
    );
  }
}

export default App;
