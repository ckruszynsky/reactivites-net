import React, {useState} from 'react';
import {Button, Card, Grid, Header, Icon} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';
import {PhotoUpload} from '../PhotoUpload';
import {PhotoListItem} from './PhotoListItem';

const Photos: React.FC<{photos: IPhoto[], isLoggedInUserProfile: boolean}> = ({photos, isLoggedInUserProfile}) => {
    const [addPhotoMode, setAddPhotoMode] = useState(true);
    return (
        <>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon="image" content="Photos" />
                    {isLoggedInUserProfile &&
                        <Button animated floated='right' basic color='pink' onClick={() => setAddPhotoMode(!addPhotoMode)}>
                            <Button.Content visible>
                                {addPhotoMode ? 'Cancel' : 'Add Photo'}
                            </Button.Content>
                            <Button.Content hidden>
                                {addPhotoMode ? (<Icon name="cancel" />) : (<Icon name="add" />)}
                            </Button.Content>
                        </Button>
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (<PhotoUpload />) : (
                        <Card.Group itemsPerRow={5}>
                            {photos.map((photo:IPhoto) => (
                                <PhotoListItem photo={photo} isLoggedInUserProfile={isLoggedInUserProfile} />
                            ))}
                        </Card.Group>
                    )}

                </Grid.Column>
            </Grid>
        </>
    )
}

export default Photos