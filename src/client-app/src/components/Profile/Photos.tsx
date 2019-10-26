import React from 'react';
import { Card, Header, Image } from 'semantic-ui-react';

import { IPhoto } from '../../models/profile';

const Photos:React.FC<{photos:IPhoto[]}> = ({photos}) => {
    return (
        <>
            <Header icon="image" content="Photos" />
            <Card.Group itemsPerRow={5}>
                {photos.map((photo)=> (
                    <Card key={photo.id}>
                        <Image src={photo.url} />
                    </Card>
                ))}
            </Card.Group>
        </>
    )
}

export default Photos
