import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { API_URL } from './utils/constants';
import Header from './Header';
// import './markingStyles.css';
import noFilesImage from '../../asserts/no-files-found.png';
import noPreviewAvailable from '../../asserts/no-preview-img.png';
import uploadImage from '../../asserts/upload-icon.png';

const MarkingUploading = (props) => {
   const [file, setFile] = useState(null); // state for storing actual image
   const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
   const [state, setState] = useState({
      title: '',
      description: '',
   });
   const [errorMsg, setErrorMsg] = useState('');
   const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
   const dropRef = useRef(); // React ref for managing the hover state of droppable area

   const handleInputChange = (event) => {
      setState({
         ...state,
         [event.target.name]: event.target.value,
      });
   };

   const onDrop = (files) => {
      const [uploadedFile] = files;
      setFile(uploadedFile);

      const fileReader = new FileReader();
      fileReader.onload = () => {
         setPreviewSrc(fileReader.result);
      };
      fileReader.readAsDataURL(uploadedFile);
      setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
      dropRef.current.style.border = '2px dashed #e9ebeb';
   };

   const updateBorder = (dragState) => {
      if (dragState === 'over') {
         dropRef.current.style.border = '2px solid #000';
      } else if (dragState === 'leave') {
         dropRef.current.style.border = '2px dashed #e9ebeb';
      }
   };

   const handleOnSubmit = async (event) => {
      event.preventDefault();

      try {
         const { title, description } = state;
         if (title.trim() !== '' && description.trim() !== '') {
            if (file) {
               const formData = new FormData();
               formData.append('file', file);
               formData.append('title', title);
               formData.append('description', description);

               setErrorMsg('');
               await axios.post(`${API_URL}/upload`, formData, {
                   
                  headers: {
                     'Content-Type': 'multipart/form-data',
                  },
                  
               });
               props.history.push('/list');
            } else {
               setErrorMsg('Please select a file to add.');
            }
         } else {
            setErrorMsg('Please enter all the field values.');
         }
      } catch (error) {
         error.response && setErrorMsg(error.response.data);
      }
   };

  
   return (
      <div className='container'>
          <br/>
         <br/>
         <br/>
        <center><h1><b> Marking Schemes</b></h1></center> <br/>
    <React.Fragment>
        <Header/>
    <Form className="search-form" onSubmit={handleOnSubmit}>
       {errorMsg && <p className="errorMsg">{errorMsg}</p>}
       <Row>
          <Col>
             <Form.Group controlId="title">
                <Form.Control type="text" name="title" value={state.title || ''} placeholder="Enter a Title" onChange={handleInputChange} />
             </Form.Group>
          </Col>
       </Row>
       <Row>
          <Col>
             <Form.Group controlId="description">
                <Form.Control type="text" name="description" className="desc-input" value={state.description || ''} placeholder="Enter a Description" onChange={handleInputChange} />
             </Form.Group>
          </Col>
       </Row>
       <div className="upload-section">
          <Dropzone onDrop={onDrop} onDragEnter={() => updateBorder('over')} onDragLeave={() => updateBorder('leave')}>
             {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                   <input {...getInputProps()} />
                   <p className="dragArea-txt">Drag and drop a file OR click here to select a file</p>
                   <img className="upload-img-icon" src={uploadImage} alt="" />
                   {file && (
                      <div>
                         <strong>Selected file:</strong> {file.name}
                      </div>
                   )}
                </div>
             )}
          </Dropzone>
          {previewSrc ? (
             isPreviewAvailable ? (
                <div className="image-preview">
                   <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
             ) : (
                <div className="preview-message">
                   <img className="no-prev-img" src={noPreviewAvailable} alt="" />
                   <p className="no-prev-img-txt">No preview available for this file</p>
                </div>
             )
          ) : (
             <div className="preview-message">
                <img className="file-not-found-img" src={noFilesImage} alt="" />
                <p className="file-not-found-txt">Image preview will be shown here after selection</p>
             </div>
          )}
       </div>
       <Button className="btn-primary-cust" variant="primary" type="submit">
          Submit
       </Button>
    </Form>
 </React.Fragment>
 </div>
   );
};

export default MarkingUploading;
