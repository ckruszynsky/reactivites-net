import React, {Fragment, useEffect, useState} from 'react';
import {Grid, Header, Image} from 'semantic-ui-react';

import {PhotoDropzone} from './PhotoDropzone';

const headerStyle = {
    color: '#2D3047',
    fontWeight: '600'
}
export const PhotoUpload = () => {
    const [files, setFiles] = useState<any[]>([]);

    //clean up for photo upload 
    //on unmount
    useEffect(()=> {
        return ()=> {
            files.forEach(f=> URL.revokeObjectURL(f.preview));
        }
    })
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={4}>
                    <Header style={headerStyle} sub content='Step 1 - Add Photo' />
                    <PhotoDropzone addFile={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub style={headerStyle} content='Step 2 - Resize image' />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub style={headerStyle} content='Step 3 - Preview & Upload' />
                    {files.length > 0 &&
                        <Image src={files[0].preview} />
                    }

                </Grid.Column>
            </Grid>
        </Fragment>
    );
};

