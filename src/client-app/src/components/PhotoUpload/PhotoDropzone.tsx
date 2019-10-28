import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Header, Icon} from 'semantic-ui-react';

const dropzoneStyles = {
  border: 'dashed 3px',
  borderColor: '#EBEBEB',
  borderRadius: '5px',
  paddingTop: '30px',
  textAlign: 'center' as 'center',
  height: '200px'
};

const dropzoneActive = {
  borderColor: '#E03997'
};

export const PhotoDropzone: React.FC<{addFile: (files: object[]) => void}> = ({addFile}) => {
  const onDrop = useCallback(acceptedFiles => {
    addFile(acceptedFiles.map((file: object) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, [addFile])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div  {...getRootProps()} style={isDragActive ? ({...dropzoneStyles, ...dropzoneActive}) : (dropzoneStyles)}>
      <input {...getInputProps()} />      
        <Icon name="upload" size='huge' />
      <Header content='Drop Image Here' />
    </div>
  )
}