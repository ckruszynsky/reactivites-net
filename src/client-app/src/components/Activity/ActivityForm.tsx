import React from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import {Button, Form, Segment} from 'semantic-ui-react';

import {categories} from '../../common';
import {IActivityFormValues} from '../../models';
import {combineDateAndTime} from '../../util/combineDateTime';
import {DateInput, SelectInput, TextAreaInput, TextInput} from '../Form';

export interface ActivityFormProps {
  activity: IActivityFormValues;
  handleSubmit: (activity: IActivityFormValues) => void;
  handleCancel: () => void;
  isSubmitting: boolean;
  loading: boolean;
}

const handleFinalFormSubmit = (values: any, submitCallback: (activity: IActivityFormValues) => void) => {
  const dateAndTime = combineDateAndTime(values.date, values.time);
  const {date, time, ...activity} = values;
  activity.date = dateAndTime;
  submitCallback(activity);
};

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});


export const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  handleSubmit,
  handleCancel,
  isSubmitting,
  loading
}) => {
  return (
    <Segment clearing>
      <FinalForm
        initialValues={activity}
        onSubmit={(values) => handleFinalFormSubmit(values, handleSubmit)}
        validate={validate}
        render={({handleSubmit, invalid, pristine}) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field
              name="title"
              placeholder="Title"
              value={activity.title}
              component={TextInput}
            />
            <Field
              rows={3}
              placeholder="Description"
              name="description"
              value={activity.description}
              component={TextAreaInput}
            />
            <Field
              name="category"
              placeholder="Category"
              value={activity.category}
              options={categories}
              component={SelectInput}
            />
            <Form.Group widths="equal">
              <Field
                placeholder="Date"
                date={true}
                name="date"
                value={activity.date}
                component={DateInput}
              />
              <Field
                placeholder="Time"
                name="time"
                time={true}
                value={activity.date}
                component={DateInput}
              />
            </Form.Group>

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
              disabled={loading || invalid || pristine}
              loading={isSubmitting}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              disabled={loading}
              onClick={() => handleCancel()}
            />
          </Form>
        )}
      />
    </Segment>
  );
};
