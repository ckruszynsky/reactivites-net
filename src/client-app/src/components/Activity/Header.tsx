import {format} from 'date-fns';
import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Button, Header as SemanticHeader, Image, Item, Segment} from 'semantic-ui-react';

import {IActivity} from '../../models';
import {RootStoreContext} from '../../stores/rootStore';

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

export const Header: React.FC<{activity: IActivity}> = observer(({activity}) => {
  const rootStore = useContext(RootStoreContext);
  const {attendActivity, cancelAttendance} = rootStore.activityStore;
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
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">

        {activity.isHost ? (
          <Button as={Link} to={`/manage/${activity.id}`} color="orange">
            Manage Event
        </Button>
        ) : activity.isGoing ? (
          <Button onClick={cancelAttendance}>Cancel attendance</Button>
        ) : (
              <Button color="teal" onClick={attendActivity}>Join Activity</Button>

            )}

      </Segment>
    </Segment.Group>
  );
});
