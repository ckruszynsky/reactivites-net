import React from 'react';
import {Tab} from 'semantic-ui-react';

import {IPhoto, IProfile} from '../../models/profile';
import {About} from './About';
import Photos from './Photos';
import {ProfileFollowings} from './ProfileFollowings';


export const getContentPanes = (
  profile: IProfile,
  isLoggedInUserProfile:boolean,
  uploadPhoto: (file:Blob) => Promise<void>,
  uploadingPhoto:boolean,
  setMainPhoto: (photo:IPhoto) => Promise<void>,
  deletePhoto: (photo:IPhoto) => Promise<void>,
  updateProfile:(displayName:string, bio:string) => Promise<void>,
  loading: boolean,
  followings: IProfile[]  
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
      render: () => 
      <Tab.Pane loading={loading}>
        <ProfileFollowings profile={profile} followings={followings}></ProfileFollowings>
      </Tab.Pane>
    },
    {
      menuItem: "Following",
      render: () =>  
      <Tab.Pane>
      <ProfileFollowings profile={profile} followings={followings}></ProfileFollowings>
    </Tab.Pane>
    }
  ];
};
