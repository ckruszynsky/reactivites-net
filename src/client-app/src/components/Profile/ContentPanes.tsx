import React from 'react';
import {Tab} from 'semantic-ui-react';

import {IProfile} from '../../models/profile';
import Photos from './Photos';

export const getContentPanes = (profile: IProfile,isLoggedInUserProfile:boolean) => {
  return [
    {
      menuItem: "About",
      render: () => <Tab.Pane>About Content</Tab.Pane>
    },
    {
      menuItem: "Photos",
      render: () => (
        <Tab.Pane>
          <Photos photos={profile.photos} isLoggedInUserProfile={isLoggedInUserProfile}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Activities",
      render: () => <Tab.Pane>Activities Content</Tab.Pane>
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>
    }
  ];
};
