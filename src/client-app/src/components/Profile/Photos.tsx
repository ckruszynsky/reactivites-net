import React, {useState} from 'react';
import {Button, Card, Grid, Header, Icon, Image} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';

const Photos: React.FC<{photos: IPhoto[], isLoggedInUserProfile: boolean}> = ({photos, isLoggedInUserProfile}) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
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
                                {addPhotoMode ? (<Icon name="cancel" />) :(<Icon name="add" />)}
                            </Button.Content>
                        </Button>
                    }
                </Grid.Column>

                <Grid.Column width={16}>
                    {addPhotoMode ? (<p>Photo widget will go here</p>) : (
                        <Card.Group itemsPerRow={5}>
                            {photos.map((photo) => (
                                <Card key={photo.id}>
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
                                        </Button.Group>
                                    }
                                </Card>
                            ))}
                        </Card.Group>
                    )}

                </Grid.Column>
            </Grid>
        </>
    )
}

export default Photos
