import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import { IActivity } from '../../models';

export const ActivityDetails: React.FC<{activity:IActivity, 
  onSetEditMode:(editMode:boolean)=> void,
  onResetSelectedActivity: ()=> void}> = ({activity,onSetEditMode, onResetSelectedActivity}) => {
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
             <Button basic color='blue' onClick={()=> onSetEditMode(true)} content='Edit' />
             <Button basic color='grey'  content='Cancel' onClick={()=> onResetSelectedActivity()} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
