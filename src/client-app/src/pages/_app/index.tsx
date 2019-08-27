import axios from "axios";
import React, { Component } from "react";
import { List } from "semantic-ui-react";

import { PageHeader } from "../../components/PageHeader";
import { IActivity } from "../../models/";

interface IState {
  activities: IActivity[];
}

class App extends Component<{}, IState> {
  readonly state: IState = {
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
        <PageHeader as="h2" icon="users">
          Reactivities
        </PageHeader>
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
