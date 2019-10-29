import React, {Fragment, useEffect, useState} from 'react';
import {Grid, Header} from 'semantic-ui-react';

import PhotoCropper from './PhotoCropper';
import {PhotoDropzone} from './PhotoDropzone';

const headerStyle = {
    color: '#2D3047',
    fontWeight: '600'
}
export const PhotoUpload = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [image,setImage] = useState<Blob|null>(null);
    //clean up for photo upload 
    //on unmount
    useEffect(()=> {
        return ()=> {
            files.forEach(f=> URL.revokeObjectURL(f.preview));
        }
    })
    return (
        <Fragment>
            <Grid >
                <Grid.Row stretched>
                <Grid.Column width={4}>
                    <Header style={headerStyle} sub content='Step 1 - Add Photo' />
                    <PhotoDropzone addFile={setFiles} />
                </Grid.Column>          
                <Grid.Column width={1}></Grid.Column>             
                <Grid.Column width={4}>
                    <Header sub style={headerStyle} content='Step 2 - Resize image' />
                    {files.length > 0 && 
                        <PhotoCropper setImage={setImage} imagePreview={files[0].preview}  />
                    }                    
                </Grid.Column>    
                <Grid.Column width={2}></Grid.Column>                            
                <Grid.Column width={4}>
                    <Header sub style={headerStyle} content='Step 3 - Preview & Upload' />
                    {files.length > 0 &&
                        <div className='img-preview' style={{minHeight:'200px', overflow:'hidden'}}></div>
                    }

                </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    );
};

