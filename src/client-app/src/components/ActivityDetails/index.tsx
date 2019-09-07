import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import ActivityStore from '../../stores/activityStore';

export interface ActivityDetailsProps {
  onSetEditMode:(editMode:boolean)=> void,
  onResetSelectedActivity: ()=> void
}
export const ActivityDetails: React.FC<ActivityDetailsProps> = observer((props:ActivityDetailsProps) => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity} = activityStore;
    return (    
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}> 
             <Button basic color='blue' onClick={()=> props.onSetEditMode(true)} content='Edit' />
             <Button basic color='grey'  content='Cancel' onClick={()=> props.onResetSelectedActivity()} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
