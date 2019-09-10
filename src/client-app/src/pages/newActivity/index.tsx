import './styles.scss';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { ActivityForm } from '../../components/ActivityForm';
import ActivityStore from '../../stores/activityStore';


export const NewActivity = observer(() => {
    const activityStore = useContext(ActivityStore);
    const { currentActivity } = activityStore;
  
    return (
        <div>
            <ActivityForm activity={currentActivity} />
        </div>
    )
});

