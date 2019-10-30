import React from 'react';
import {Tab} from 'semantic-ui-react';

import {IPhoto, IProfile} from '../../models/profile';
import {About} from './About';
import Photos from './Photos';


export const getContentPanes = (
  profile: IProfile,
  isLoggedInUserProfile:boolean,
  uploadPhoto: (file:Blob) => Promise<void>,
  uploadingPhoto:boolean,
  setMainPhoto: (photo:IPhoto) => Promise<void>,
  deletePhoto: (photo:IPhoto) => Promise<void>,
  updateProfile:(displayName:string, bio:string) => Promise<void>,
  loading: boolean
) => {
  return [
    {
      menuItem: "About",
      render: () => <Tab.Pane>
        <About profile={profile} 
             isLoggedInUserProfile={isLoggedInUserProfile}
             updateProfile={updateProfile}
             loading={loading}
        /></Tab.Pane>
    },
    {
      menuItem: "Photos",
      render: () => (
        <Tab.Pane>
          <Photos photos={profile.photos} 
                  isLoggedInUserProfile={isLoggedInUserProfile}
                  uploadPhoto={uploadPhoto}
                  uploadingPhoto={uploadingPhoto}
                  setMainPhoto={setMainPhoto} 
                  deletePhoto={deletePhoto}
                  loading={loading} />
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
