import { useState } from "react";
import {Col} from "react-bootstrap";
import { Container } from "react-bootstrap";

const StudentUpload = () => {
  
  const [data, setData] = useState({
    groupId: "",
    image: "",
  });
  const handleChange = (groupId) => (e) => {
    const value = groupId === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [groupId]: value });
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("groupId", data.groupId);

      const res = await fetch(`http://localhost:5000/api/studentUpload/add`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setData({ groupId: "", image: "" });
        alert("Successfull Uploaded") //display if adding is successful
        window.location = `/sUploadList`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="container">
        <Container>
          <br/>
          <br/>
          <br/>
          <h1><b>UPLOAD SUBMISSION</b></h1>
         <br/>
         
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter groupId"
          type="text"
          name="groupId"
          required
          value={data.groupId}
          onChange={handleChange("groupId")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          name="image"
          required
          onChange={handleChange("image")}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button> 

      </div>
    </div>
    
    </Container>
    </div>
  );
};

export default StudentUpload;