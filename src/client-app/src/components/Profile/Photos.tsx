import React, {useState} from 'react';
import {Button, Card, Grid, Header} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';
import {PhotoUpload} from '../PhotoUpload';
import {IProfileContentProps} from './IProfileContentProps';
import {PhotoListItem} from './PhotoListItem';

export interface IPhotosProps extends Omit<IProfileContentProps, 'profile'> {
    photos: IPhoto[];
}

const Photos: React.FC<IPhotosProps> = ({
    photos,
    isLoggedInUserProfile,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    deletePhoto,
    loading
}) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    }
    return (
        <>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon="image" content="Photos" />
                    {isLoggedInUserProfile &&
                        <Button floated='right'
                            inverted
                            color='pink'
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            icon={addPhotoMode ? "cancel" : "add"}>
                        </Button>
                    }
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode && isLoggedInUserProfile ? (<PhotoUpload uploadPhoto={handleUploadImage} loading={uploadingPhoto} />) : (
                        <Card.Group itemsPerRow={5}>
                            {photos.map((photo: IPhoto) => (
                                <PhotoListItem photo={photo}
                                    isLoggedInUserProfile={isLoggedInUserProfile}
                                    setMainPhoto={setMainPhoto}
                                    deletePhoto={deletePhoto}
                                    loading={loading} />
                            ))}
                        </Card.Group>
                    )}

                </Grid.Column>
            </Grid>
        </>
    )
}

export default Photos