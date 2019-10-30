import React, {useState} from 'react';
import {Button, Card, Image} from 'semantic-ui-react';

import {IPhoto} from '../../models/profile';


export const PhotoListItem: React.FC<{
    photo: IPhoto,
    isLoggedInUserProfile: boolean,
    setMainPhoto: (photo: IPhoto) => Promise<void>,
    deletePhoto: (photo: IPhoto) => Promise<void>,
    loading: boolean
}> = ({
    photo,
    isLoggedInUserProfile,
    setMainPhoto,
    deletePhoto,
    loading}) => {
        const [target,setTarget] = useState<string|undefined>();

        return (<Card key={photo.id}>
            <Image src={photo.url} />
            {isLoggedInUserProfile &&
                <Button.Group size="small">
                    <Button name={photo.id}
                        inverted color="pink"
                        icon="plus"
                        onClick={(e) => { 
                            setTarget(e.currentTarget.name); 
                            setMainPhoto(photo)
                        }
                    } 
                    loading={loading && target === photo.id}
                    disabled={photo.isMain}
                    />
                    <Button inverted 
                        color="purple" 
                        icon="trash" 
                        onClick={() => deletePhoto(photo)}
                        disabled={photo.isMain} />
                </Button.Group>}
        </Card>)
    };
