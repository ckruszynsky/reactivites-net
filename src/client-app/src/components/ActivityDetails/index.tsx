import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import { IActivity } from '../../models';
import { Link } from '../../util/router';


export const ActivityDetails:React.FC<{
  activity:IActivity;
  onCancel:()=> void;
}> = observer(({activity, onCancel}) => {
  
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
          <Button basic color="blue" as={Link} to={`/manage/${activity.id}`} content="Edit" />
          <Button basic color="grey" content="Cancel" onClick={onCancel} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
