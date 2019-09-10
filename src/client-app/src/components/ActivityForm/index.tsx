import React, { useContext } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

import { IActivity } from '../../models';

export interface ActivityFormProps {
  activity: IActivity;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
  handleCancel: () => void;
  isSubmitting: boolean;
}

export const ActivityForm: React.FC<ActivityFormProps> =
  (props: ActivityFormProps) => {
    return (
      <Segment clearing>
        <Form onSubmit={() => props.handleSubmit()}>
          <Form.Input
            placeholder="Title"
            name="title"
            value={props.activity.title}
            onChange={evt => props.handleInputChange(evt)}
          />
          <Form.TextArea
            rows={2}
            placeholder="Description"
            name="description"
            value={props.activity.description}
            onChange={evt => props.handleInputChange(evt)}
          />
          <Form.Input
            placeholder="Category"
            name="category"
            value={props.activity.category}
            onChange={evt => props.handleInputChange(evt)}
          />
          <Form.Input
            type="datetime-local"
            placeholder="Date"
            name="date"
            value={props.activity.date}
            onChange={evt => props.handleInputChange(evt)}
          />
          <Form.Input
            placeholder="City"
            name="city"
            value={props.activity.city}
            onChange={evt => props.handleInputChange(evt)}
          />
          <Form.Input
            placeholder="Venue"
            name="venue"
            value={props.activity.venue}
            onChange={evt => props.handleInputChange(evt)}
          />
          <Button
            floated="right"
            positive
            type="submit"
            content="Submit"
            loading={props.isSubmitting}
          />
          <Button floated="right" content="Cancel" onClick={() => props.handleCancel()} />
        </Form>
      </Segment>
    );
  };
