import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import { IActivity } from '../../models';

export const ActivityDetails: React.FC<{activity:IActivity, setEditMode:(editMode:boolean)=> void}> = ({activity,setEditMode}) => {
  return (    
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}> 
             <Button basic color='blue' onClick={()=> setEditMode(true)} content='Edit' />
             <Button basic color='grey'  content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
