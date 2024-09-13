import React from 'react';
import Pdf from "react-to-pdf";
import './Template.css';
const ref = React.createRef();

const DownloadTemplate = (props) => {
  return (
    <>
      
      <div className='container'>
        <br/><br/><br/>
      <div className="Post" ref={ref}>
        <center>
        <h1>{props.title}</h1>
        <img src={props.image} alt={props.title} />
        <p color='black'>{props.content}</p>
        </center>
      </div>
      <center>
      <Pdf targetRef={ref} filename="Template.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
      </center>
     
      
      </div>
    </>
  );
}

export default DownloadTemplate;