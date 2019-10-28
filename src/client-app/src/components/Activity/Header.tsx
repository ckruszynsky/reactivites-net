import {format} from 'date-fns';
import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Header as SemanticHeader, Icon, Image, Item, Segment} from 'semantic-ui-react';

import {IActivity} from '../../models';

const activityImageStyle = {
  filter: "brightness(30%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

export const Header: React.FC<{activity: IActivity, onAttendActivity: () => void, onCancelAttendance: () => void, loading: boolean}> =
({activity, onAttendActivity, onCancelAttendance, loading}) => {
    const host = activity.attendees.filter(x=> x.isHost)[0];
    return (
      <Segment.Group>
        <Segment basic attached="top" style={{padding: "0"}}>
          <Image
            src={`/assets/categoryImages/${activity.category}.jpg`}
            fluid
            style={activityImageStyle}
          />
          <Segment basic style={activityImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <SemanticHeader size="huge"
                    content={activity.title}
                    style={{color: "white"}} />
                  <p>{format(activity.date, 'eeee,MMMM do')}</p>
                  <p>
                    Hosted by <Link to={`/profile/${host.username}`}>{host.displayName}</Link>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached="bottom">

          {activity.isHost ? (
            <Button animated as={Link} to={`/manage/${activity.id}`} color="pink">
              <Button.Content visible>
                  Manage Event
              </Button.Content>
              <Button.Content hidden>
                <Icon name="edit outline" />
              </Button.Content>
            </Button>
          ) : activity.isGoing ? (
            <Button loading={loading} onClick={onCancelAttendance}>Cancel attendance</Button>
          ) : (
                <Button color="teal" loading={loading} onClick={onAttendActivity}>Join Activity</Button>

              )}

        </Segment>
      </Segment.Group>
    );
  };
