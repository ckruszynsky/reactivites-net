import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import { IActivity } from '../../models';
import { Link, useRouter } from '../../util/router';


export const ActivityDetails:React.FC<{
  activity:IActivity
}> = observer(({activity}) => {
  const router = useRouter();  
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
          <Button basic color="grey" content="Cancel" onClick={() => router.push('/activities')} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
