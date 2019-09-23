import React, {useContext} from 'react';

import {Signup} from '../../components/SignUp';
import {RootStoreContext} from '../../stores/rootStore';


export const Register: React.FC<{}> = () => {
    const rootStore = useContext(RootStoreContext);
    const {register} = rootStore.userStore;

    return (
        <Signup onRegister={register} />
    );
}