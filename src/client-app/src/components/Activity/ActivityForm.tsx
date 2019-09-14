import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
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

const handleFinalFormSubmit = (values: any) => {
  console.log(values);
};

export const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  handleInputChange,
  handleSubmit,
  handleCancel
}) => {
  return (
    <Segment clearing>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="title"
              placeholder="Title"
              value={activity.title}
              component="input"
            />
            <Form.TextArea
              rows={2}
              placeholder="Description"
              name="description"
              value={activity.description}
              onChange={evt => handleInputChange(evt)}
            />
            <Form.Input
              placeholder="Category"
              name="category"
              value={activity.category}
              onChange={evt => handleInputChange(evt)}
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              name="date"
              value={activity.date}
              onChange={evt => handleInputChange(evt)}
            />
            <Form.Input
              placeholder="City"
              name="city"
              value={activity.city}
              onChange={evt => handleInputChange(evt)}
            />
            <Form.Input
              placeholder="Venue"
              name="venue"
              value={activity.venue}
              onChange={evt => handleInputChange(evt)}
            />
            <Button
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={isSubmitting}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              onClick={() => handleCancel()}
            />
          </Form>
        )}
      />
    </Segment>
  );
};
