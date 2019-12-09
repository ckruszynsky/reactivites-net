import React from 'react';
import {Tab} from 'semantic-ui-react';
import {IProfileContentProps} from './IProfileContentProps';
import {ProfileDescription} from './ProfileDescription';
import ProfileActivities from './ProfileActivities';
import {ProfileFollowings} from './ProfileFollowings';
import Photos from './Photos';

const menuOptions = { fluid: true, vertical: true };

const panes = [
        { menuItem: 'About', render: () => <ProfileDescription /> },
        { menuItem: 'Photos', render: () => <Photos /> },
        {
          menuItem: 'Activities',
          render: () => <ProfileActivities />
        },
        { menuItem: 'Followers', render: () => <ProfileFollowings /> },
        { menuItem: 'Following', render: () => <ProfileFollowings /> }
      ];

export const Content:React.FC<IProfileContentProps> = ({setActiveTab}) => {
        return (
                <Tab
                  menu={{ fluid: true, vertical: true }}
                  menuPosition='right'
                  panes={panes}
                  onTabChange={(e, data) => setActiveTab(data.activeIndex)}
                />
              );
};
