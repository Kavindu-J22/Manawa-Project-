import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { API_URL } from '../utils/constantsSub';
import {Link} from 'react-router-dom';
import './Submission.css';


const DocumentSubmission = (props) => {
   const [submission, setSubmission] = useState(null); // state for storing actual image
   const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
   const [state, setState] = useState({
      groupId: '',
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

   const onDrop = (submissions) => {
      const [uploadedSubmission] = submissions;
      setSubmission(uploadedSubmission);

      const submissionReader = new FileReader();
      submissionReader.onload = () => {
         setPreviewSrc(submissionReader.result);
      };
      submissionReader.readAsDataURL(uploadedSubmission);
      setIsPreviewAvailable(uploadedSubmission.name.match(/\.(jpeg|jpg|png)$/));
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
         const {groupId} = state;
         if (groupId.trim() !== '' ) {
            if (submission) {
               const formData = new FormData();
               formData.append('submission', submission);
               formData.append('groupId', groupId);
               

               setErrorMsg('');
               await axios.post(`${API_URL}/add`, formData, {
                  headers: {
                     
                     'Content-Type': 'multipart/form-data'
                   }
               });
               props.history.push('/sUploadList');
            } else {
               setErrorMsg('Please select a file to add.');
            }
         } else {
            setErrorMsg('Please enter all the field values.');
         }
      } catch (error) {
         error.response && setErrorMsg("Error");
      }
   };

   return (
      <div className='container'>
         <br/>
         <br/>
         <br/>
        <center><h1><b> SUBMISSION</b></h1></center> <br/>
      <React.Fragment>
         <Form className="search-form" onSubmit={handleOnSubmit}>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Row>
               <Col>
                  <Form.Group controlId="groupId">
                     <label><b>groupId</b></label>
                     <Form.Control type="text" name="groupId" value={state.groupId || ''} placeholder="Enter a groupId" onChange={handleInputChange} />
                  </Form.Group>
               </Col>
            </Row>     <br/>   

            {/*add the option to upload the file from the UI.*/}
            <div className="upload-section">
               <Dropzone onDrop={onDrop} onDragEnter={() => updateBorder('over')} onDragLeave={() => updateBorder('leave')}>
                  {({ getRootProps, getInputProps }) => (
                     <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                        <input {...getInputProps()} 
                        />
                        <p className="dragArea-txt">Drag and drop a file OR click here to select a file</p>
                       
                        {submission && (
                           <div>
                              <strong>Selected submission:</strong> {submission.groupId}
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
                     
                        <p className="no-prev-img-txt">No preview available for this file</p>
                     </div>
                  )
               ) : (
                  <div className="preview-message">
                   
                     <p className="file-not-found-txt"><b>Image preview will be shown here after selection</b></p>
                  </div>
               )}
            </div>
            <Button className="btn-primary-cust" variant="primary" type="submit">
               Submit
            </Button>
            <br/>
                <br/>
                <br/>

                <Link to={"/sUploadList"}  variant="primary" type="submit" class="btn btn-outline-success btn-lg">
               To View Uploads
              </Link>{' '}{'  '} 
               <Link to={"/studentUpload"}  variant="primary" type="submit" class="btn btn-outline-danger btn-lg">
               To Upload All type of Files
              </Link>

         </Form>
      </React.Fragment>
      </div>
   );
};

export default DocumentSubmission;
