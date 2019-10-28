import React, {Fragment} from 'react';
import {Grid, Header} from 'semantic-ui-react';

const headerStyle = {    
    color: '#2D3047',
    fontWeight:'600'
}
export const PhotoUpload = () => (
    <Fragment>
        <Grid>            
            <Grid.Column width={4}>
                <Header style={headerStyle} sub content='Step 1 - Add Photo' />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub style={headerStyle} content='Step 2 - Resize image' />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub style={headerStyle} content='Step 3 - Preview & Upload' />
            </Grid.Column>
        </Grid>
    </Fragment>
);

