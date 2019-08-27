import axios from "axios";
import React, { Component } from "react";
import { List } from "semantic-ui-react";

import { PageHeader } from "../../components/PageHeader";
import { Activities } from '../../components/Activities';
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
        <Activities activities={activities}></Activities>
      </div>
    );
  }
}

export default App;
