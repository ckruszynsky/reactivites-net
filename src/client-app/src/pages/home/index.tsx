import './styles.scss';

import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Header, Image, Segment} from 'semantic-ui-react';

import {RootStoreContext} from '../../stores/rootStore';
import {Login} from '../login';

export const Home = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore;
    const {openModal} = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Reactivities
                 </Header>
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to your activities
                        </Button>
                    </Fragment>
                ) : (
                        <Fragment>
                            <Header as='h2' inverted content='Welcome to Reactivities' />
                            <Button size='huge' inverted onClick={() => openModal(<Login />)}>
                                Login
                            </Button>
                            <Button as={Link} to='/register' size='huge' inverted>
                                Register
                            </Button>
                        </Fragment>
                    )
                }
            </Container>
        </Segment>
    );
};
