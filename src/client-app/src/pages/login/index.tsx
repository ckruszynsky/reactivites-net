import React, {useContext} from 'react';

import {Signin} from '../../components/Signin';
import {RootStoreContext} from '../../stores/rootStore';


export const Login: React.FC<{}> = () => {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;

    return (
        <Signin onLogin={login} />
    );
}