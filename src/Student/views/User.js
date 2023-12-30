import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineRollback } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';


const DashboardContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CardBody = styled.div`
  padding: 20px;
`;

const dropzoneStyles = {
  border: '2px dashed #ccc',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  margin: '20px 0',
};

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '400px',
  margin: '10px 0',
};

// ... (your imports)

const ImageProcessingPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [grayscaleImage, setGrayscaleImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const image = URL.createObjectURL(acceptedFiles[0]);
    setUploadedImage(image);
    // Additional actions after uploading the image (if needed)
    onUpload(acceptedFiles[0]);
  };

  const onUpload = async (file) => {
    try {
      // Perform additional upload actions here
      console.log('Uploading file:', file);
      // For example, you can send the file to a server using axios or fetch
      // axios.post('/upload', file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const convertToGrayscale = (imageElement) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imageElement.src;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }

      context.putImageData(imageData, 0, 0);
      setGrayscaleImage(canvas.toDataURL('image/png'));
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false, // Allow only one file to be dropped
  });

  useEffect(() => {
    if (uploadedImage) {
      const imgElement = new Image();
      imgElement.src = uploadedImage;
      convertToGrayscale(imgElement);
    }
  }, [uploadedImage]);

  return (
      <DashboardContainer>
        <Header>
          <h2></h2>
          <Link to="/dashboard">
            <AiOutlineRollback />
          </Link>
        </Header>
        <MainContent>
          <Card>
            <CardBody>
              <div>
                <h2>Image Upload</h2>
                <div {...getRootProps()} style={dropzoneStyles}>
                  <input {...getInputProps()} />
                  <p>Drag & drop an image here, or click to select an image.</p>
                </div>

                {uploadedImage && (
                    <div>
                      <h3>Selected Image</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <h4>Original Image</h4>
                          <img src={uploadedImage} alt="Selected" style={imageStyles} />
                        </div>
                        {grayscaleImage && (
                            <div>
                              <h4>Grayscale Image</h4>
                              <img src={grayscaleImage} alt="Grayscale" style={imageStyles} />
                            </div>
                        )}
                      </div>
                    </div>
                )}
              </div>
            </CardBody>
          </Card>
        </MainContent>
      </DashboardContainer>
  );
};

export default ImageProcessingPage;