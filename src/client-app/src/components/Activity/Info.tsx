import {format} from 'date-fns';
import React from 'react';
import {Grid, Icon, Segment} from 'semantic-ui-react';

import {IActivity} from '../../models';

export const Info:React.FC<{activity:IActivity}> = ({activity}) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="purple" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(activity.date,'eeee,MMMM do')} @  {format(activity.date,'h:mm a')} </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="purple" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {activity.venue}, {activity.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
