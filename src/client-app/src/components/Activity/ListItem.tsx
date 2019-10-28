import {format} from 'date-fns';
import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon, Item, Label, Segment} from 'semantic-ui-react';

import {IActivity} from '../../models';
import {AttendeesListItem} from './AttendeesListItem';

interface ListItemParams {
  activity: IActivity;
}
export const ListItem: React.FC<ListItemParams> = ({activity}) => {
  const host = activity.attendees.filter(x=> x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={host.image || "/assets/user.png"} style={{marginBottom: '3px'}} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
              <Item.Description>Hosted by <Link to={`/profile/${host.username}`}>{host.displayName}</Link></Item.Description>
              <Item.Description>
                {activity.isHost &&
                  <Label basic color='orange' content="You are hosting this activity" />
                }
              </Item.Description>
              <Item.Description>
                {activity.isGoing && !activity.isHost && 
                  <Label basic color='green' content="You are going to this activity" />
                }
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {format(activity.date, 'h:mm a')} <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <AttendeesListItem attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button animated as={Link} to={`/activities/${activity.id}`} floated="right" color="pink">
            <Button.Content visible>
              View
            </Button.Content>
            <Button.Content hidden>
              <Icon name="folder open outline" />
            </Button.Content>
        </Button>
      </Segment>
    </Segment.Group>
  );
};
