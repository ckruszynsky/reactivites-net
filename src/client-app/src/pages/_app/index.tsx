import axios from 'axios';
import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';



class App extends Component {
  state = {
    activities: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/activities").then(response => {
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
            {activities.map((activitiy: any) => (
              <List.Item key={activitiy.id}>{activitiy.title}</List.Item>
            ))}
          </List>        
      </div>
    );
  }
}

export default App;
