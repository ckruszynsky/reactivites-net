import React, {useState} from 'react';
import {Button, Card, Grid, Header} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';
import {PhotoUpload} from '../PhotoUpload';
import {PhotoListItem} from './PhotoListItem';

const Photos: React.FC<{
    photos: IPhoto[], 
    isLoggedInUserProfile: boolean,
    uploadPhoto: (file:Blob) => Promise<void>,
    uploadingPhoto: boolean
}> = ({
    photos, 
    isLoggedInUserProfile,
    uploadPhoto,
    uploadingPhoto
}) => {
    const [addPhotoMode, setAddPhotoMode] = useState(true);
    const handleUploadImage = (photo:Blob) => {
        uploadPhoto(photo).then(()=> setAddPhotoMode(false));
      }
    return (
        <>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon="image" content="Photos" />
                    {isLoggedInUserProfile &&
                        <Button  floated='right'                                  
                                inverted
                                color='pink' 
                                onClick={() => setAddPhotoMode(!addPhotoMode)}
                                content={addPhotoMode ? 'Cancel': 'Add Photo'}
                                icon={addPhotoMode ? "cancel" : "add"}>                            
                        </Button>
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode && isLoggedInUserProfile ? (<PhotoUpload uploadPhoto={handleUploadImage} loading={uploadingPhoto} />) : (
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