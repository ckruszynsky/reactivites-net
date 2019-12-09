import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Image, Item, Label, List, Segment} from 'semantic-ui-react';

import {IAttendee} from '../../models';
import {observer} from 'mobx-react-lite';

const HeaderStyle= {
  backgroundColor:'#2D3047',
  border:'none'
};
export const Sidebar: React.FC<{attendees: IAttendee[]}> = observer(({attendees}) => {  
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={HeaderStyle}
        attached="top"
        secondary
        inverted
        >
        {attendees.length}  {attendees.length === 1 ? 'Person' : 'People'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee => (
            <Item key={attendee.username} style={{position: "relative"}}>
              {attendee.isHost && <Label style={{position: "absolute", backgroundColor:'#4062BB', color:'#fff'}}  ribbon="right">
                Host
             </Label>}
              <Image size="tiny" src={attendee.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>
                </Item.Header>
                {attendee.following && 
                  <Item.Extra style={{color: "#e03997", fontWeight:'bold'}}>Following</Item.Extra>
                }
              </Item.Content>
            </Item>
          )))}
        </List>
      </Segment>
    </Fragment>
  );
});
