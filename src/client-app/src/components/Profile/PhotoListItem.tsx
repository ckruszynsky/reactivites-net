import React from 'react';
import {Button, Card, Icon, Image} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';

export const PhotoListItem: React.FC<{
    photo: IPhoto;
    isLoggedInUserProfile: boolean;
}> = ({photo, isLoggedInUserProfile}) => (<Card key={photo.id}>
    <Image src={photo.url} />
    {isLoggedInUserProfile &&
        <Button.Group fluid widths={2}>
            <Button animated basic color="pink" content='Main'>
                <Button.Content visible>
                    <Icon name="user plus" />
                </Button.Content>
                <Button.Content hidden>
                    Set Main
                </Button.Content>
            </Button>
            <Button animated basic color="purple">
                <Button.Content visible>
                    <Icon name="trash" />
                </Button.Content>
                <Button.Content hidden>
                    Remove
                </Button.Content>
            </Button>
        </Button.Group>}
</Card>);
