import {IPhoto, IProfile} from '../../models/profile';

export interface IProfileContentProps {
    profile:IProfile;
    isLoggedInUserProfile:boolean,
    uploadPhoto: (file:Blob) => Promise<void>,
    uploadingPhoto: boolean,
    setMainPhoto: (photo:IPhoto)=> Promise<void>,
    deletePhoto: (photo:IPhoto) => Promise<void>,
    loading:boolean
}