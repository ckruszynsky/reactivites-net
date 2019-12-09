import React, {useState, useContext} from 'react';
import {Button, Card, Grid, Header, Tab} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';
import {PhotoUpload} from '../PhotoUpload';
import {IProfileContentProps} from './IProfileContentProps';
import {PhotoListItem} from './PhotoListItem';
import {RootStoreContext} from '../../stores/rootStore';
import {observer} from 'mobx-react-lite';


const Photos: React.FC = observer(() => {
    const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    deletePhoto,
    loading
  } = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);


  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              onClick={() => setAddPhotoMode(!addPhotoMode)}
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUpload
              uploadPhoto={handleUploadImage}
              loading={uploadingPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map(photo => (
                  <PhotoListItem
                        photo={photo}
                        isLoggedInUserProfile={isCurrentUser}                    
                        setMainPhoto={setMainPhoto}          
                        deletePhoto={deletePhoto}  
                        loading={loading}            
                    />
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});

export default Photos