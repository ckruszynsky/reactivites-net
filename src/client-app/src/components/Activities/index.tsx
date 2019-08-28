import './styles.scss';

import React from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

import { IActivity } from '../../models';

export const Activities: React.FC<{
  activities: IActivity[];
}> = props => (

    <Item.Group divided>
      {props.activities.map((activitiy: IActivity) => (
        <Item>
          <Item.Content>
            <Item.Header as="a">{activitiy.title}</Item.Header>
            <Item.Meta>{activitiy.date}</Item.Meta>
            <Item.Description>
              <div>{activitiy.description}</div>
              <div>
                {activitiy.city}, {activitiy.venue}
              </div>
            </Item.Description>
            <Item.Extra>
              <Button floated="right" content="View" color="blue" />
              <Label basic content="Category" />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>  
);
