import React from 'react';
import {Button, Card, Image} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';


export const PhotoListItem: React.FC<{
    photo: IPhoto,
    isLoggedInUserProfile:boolean,
    setMainPhoto: (photo:IPhoto)=> Promise<void>,
    deletePhoto: (photo:IPhoto) => Promise<void>, 
    loading:boolean}> = ({
        photo, 
        isLoggedInUserProfile,
        setMainPhoto,
        deletePhoto,
        loading}) => (<Card key={photo.id}>
    <Image src={photo.url} />
    {isLoggedInUserProfile &&
        <Button.Group   size="small">       
            <Button inverted color="pink" icon="plus" onClick={()=> setMainPhoto(photo)} loading={loading} />
            <Button inverted color="purple" icon="trash" onClick={()=> deletePhoto(photo)} />            
        </Button.Group>}
</Card>);
