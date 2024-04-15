import React from 'react';
import UploadImages from './uploadImages';
import LoadingImages from './loadingImages';

const CreateGroupTemplate = ({ continueButton, selectImage, images, removeImage, setImages }) => {
  return (
    <>
        {
            images.length > 0 ?
                <LoadingImages
                    images={images}
                    removeImage={removeImage}
                    selectImage={selectImage}
                    setImages={setImages}
                    continueButton={continueButton}
                />
            :
                <UploadImages 
                    continueButton={continueButton}
                    selectImage={selectImage}
                />
        }
    </>
  );
}

export default CreateGroupTemplate;
