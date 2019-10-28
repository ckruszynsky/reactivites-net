import React, {useState} from 'react';
import {Button, Card, Grid, Header, Icon, Image} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';

const Photos: React.FC<{photos: IPhoto[], isLoggedInUserProfile: boolean}> = ({photos, isLoggedInUserProfile}) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    return (
        <>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon="image" content="Photos" />
                    {isLoggedInUserProfile &&
                        <Button animated floated='right' color='pink'>
                            <Button.Content visible>
                                {addPhotoMode ? 'Cancel' : 'Add Photo'}
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="add" />
                            </Button.Content>
                        </Button>
                    }
                </Grid.Column>

                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={5}>
                        {photos.map((photo) => (
                            <Card key={photo.id}>
                                <Image src={photo.url} />
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Photos
