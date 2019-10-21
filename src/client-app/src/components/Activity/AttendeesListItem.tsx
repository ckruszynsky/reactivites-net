import React from 'react';
import {Image, List, Popup} from 'semantic-ui-react';

import {IAttendee} from '../../models';

export const AttendeesListItem:React.FC<{attendees:IAttendee[]}> = ({attendees}) => {
    return (
        <List horizontal>
            {attendees && attendees.map((attendee:IAttendee) => (
            <List.Item key={attendee.username}>
                <Popup 
                    header={attendee.displayName}
                    trigger={
                        <Image size='mini' circular src={ attendee.image || '/assets/user.png'}  />
                    }
               />
            </List.Item>
            ))}
        </List>
    );
}


