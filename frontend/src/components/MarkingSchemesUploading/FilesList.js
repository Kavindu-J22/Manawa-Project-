import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from './utils/constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';


const FilesList = () => {
   const [filesList, setFilesList] = useState([]);
   const [errorMsg, setErrorMsg] = useState('');

   useEffect(() => {
      const getFilesList = async () => {
         try {
            const { data } = await axios.get(`${API_URL}/getAllFiles`);
            setErrorMsg('');
            setFilesList(data);
         } catch (error) {
            error.response && setErrorMsg(error.response.data);
         }
      };

      getFilesList();
   }, []);

   const downloadFile = async (id, path, mimetype) => {
      try {
         const result = await axios.get(`${API_URL}/download/${id}`, {
            responseType: 'blob',
         });
         const split = path.split('/');
         const filename = split[split.length - 1];
         setErrorMsg('');
         return download(result.data, filename, mimetype);
      } catch (error) {
         if (error.response && error.response.status === 400) {
            setErrorMsg('Error while downloading file. Try again later');
         }
      }
   };

  //delete
  function deleteMarking(_id) {
   axios
     .delete(`${API_URL}/delete/${_id}`)
     .then((res) => {
       //console.log(res.data);
     })
     .catch((err) => {
       alert(err);
     });
 }

   return (
      <div className="files-container">
         <br/>
         <br/>
         <br/>
         <h1>Marking Schemes</h1>
         {errorMsg && <p className="errorMsg">{errorMsg}</p>}
         <table className="files-table table-striped">
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Download</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {filesList.length > 0 ? (
                  filesList.map(({ _id, title, description, file_path, file_mimetype }) => (
                     <tr key={_id}>
                        <td className="file-title">{title}</td>
                        <td className="file-description">{description}</td>
                        <td>
                           <a href="#/" onClick={() => downloadFile(_id, file_path, file_mimetype)}>
                              Download
                           </a>
                           
                        </td>
                        <td><button
              className="btn btn-sm markingButton"
              onClick={() => {if (window.confirm('Are you sure you wish to delete this record?')) deleteMarking(_id)}}
            >
              <DeleteForeverIcon className="btn-icon" style={{color:red[600]}} fontSize="small"/>
            </button></td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan={3} style={{ fontWeight: '300' }}>
                        No files found. Please add some.
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default FilesList;
