import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Form, Segment } from 'semantic-ui-react';

import { IActivity } from '../../models';
import { TextInput } from '../Form';

export interface ActivityFormProps {
  activity: IActivity;
  handleSubmit: () => void;
  handleCancel: () => void;
  isSubmitting: boolean;
}

const handleFinalFormSubmit = (values: any) => {
  console.log(values);
};

export const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  handleSubmit,
  handleCancel,
  isSubmitting
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
              component={TextInput}
            />
            <Field
              rows={2}
              placeholder="Description"
              name="description"
              value={activity.description}
              component={TextInput}
            />
             <Field
              name="category"
              placeholder="Category"
              value={activity.category}
              component={TextInput}
            />
            <Field
              type="datetime-local"
              placeholder="Date"
              name="date"
              value={activity.date}
              component={TextInput}
            />
            <Field
              placeholder="City"
              name="city"
              value={activity.city}
              component={TextInput}
            />
            <Field
              placeholder="Venue"
              name="venue"
              value={activity.venue}
              component={TextInput}
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
