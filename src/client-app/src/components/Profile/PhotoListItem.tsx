import React from 'react';
import {Button, Card, Image} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';

export const PhotoListItem: React.FC<{
    photo: IPhoto;
    isLoggedInUserProfile: boolean;
}> = ({photo, isLoggedInUserProfile}) => (<Card key={photo.id}>
    <Image src={photo.url} />
    {isLoggedInUserProfile &&
        <Button.Group   size="small">       
            <Button inverted color="pink" icon="plus" />
            <Button inverted color="purple" icon="trash" />            
        </Button.Group>}
</Card>);
