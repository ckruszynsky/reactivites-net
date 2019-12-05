import React from 'react';
import {Image, List, Popup} from 'semantic-ui-react';

import {IAttendee} from '../../models';
import {Link} from '../../util/router';
const styles = {
    borderColor: '#e03997',
    borderWidth:2
};

export const AttendeesListItem:React.FC<{attendees:IAttendee[]}> = ({attendees}) => {
    return (
        <List horizontal>
            {attendees && attendees.map((attendee:IAttendee) => (
            <List.Item key={attendee.username}
             as={Link}
             to={`/profile/${attendee.username}`}>
                <Popup 
                    header={attendee.displayName}
                    trigger={
                        <Image 
                            size='mini' 
                            circular 
                            src={ attendee.image || '/assets/user.png'}
                            bordered
                            style={attendee.following ? styles : null}  
                        />
                    }
               />
            </List.Item>
            ))}
        </List>
    );
}


