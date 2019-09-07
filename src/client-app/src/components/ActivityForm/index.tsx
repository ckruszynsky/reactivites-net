import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { IActivity } from '../../models';

export const ActivityForm: React.FC<{
  onSetEditMode: (editMode: boolean) => void;
  activity: IActivity | undefined;
  onCreateActivity: (activity: IActivity) => void;
  onEditActivity: (activity: IActivity) => void;
  submitting:boolean
}> = ({ onSetEditMode, activity: initialFormState, onCreateActivity, onEditActivity, submitting }) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    }
    return {
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: ""
    };
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({
      ...activity,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      onCreateActivity(newActivity);
    } else {
      onEditActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit()}>
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="date"
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" loading={submitting} />
        <Button floated="right" content="Cancel" onClick={() => onSetEditMode(false)} />
      </Form>
    </Segment>
  );
};
