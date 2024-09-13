import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './evaluations.css'

function AddmarksDocs() {
  const [groupno, setGroupno] = useState("");
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [description, setDescription] = useState("");

  function sendMarksData(e) {
    e.preventDefault(); //prevent submit event default behaviour
    const newDocMarks = {
        groupno,
        title,
        total,
        description
    };

    axios
      .post("http://localhost:5000/api/evaluateDocs/add", newDocMarks)
      .then(() => {
        alert("Marks added for document");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
      <div>
  
    <div className="marksBody">
      <div className="container col-6" onSubmit={sendMarksData}>
        <form className="addMarks">
        <div className="form-group">
            <label for="exampleInputmonth">Document Title</label>
            <select id="inputState" className="form-control" onChange={(e) => {
                setTitle(e.target.value);
              }}>
              <option defaultValue>-- Select Document --</option>
                  <option value="topic assesment">Topic Assesment Form</option>
                  <option value="proposal document">Proposal Document</option>
                  <option value="final thesis">Final Thesis</option>
            </select>
          </div>
          <br/>
          <div className="form-group">
            <label for="exampleInputEntryDate1">Group ID</label>
            <input
              required ={true}
              type="text"
              className="form-control"
              id="exampleInputEntryDate1"
              placeholder="Enter ID"
              onChange={(e) => {
                setGroupno(e.target.value);
              }}
            />
          </div>
          <br/>
          <div className="form-group">
            <label for="exampleInputEntryDate1">Marks</label>
            <input
              required ={true}
              type="number" min="0" 
              className="form-control"
              id="exampleInputEntryDate1"
              placeholder="0"
              onChange={(e) => {
                setTotal(e.target.value);
              }}
            />
          </div>
          <br/>
          <div className="form-group">
            <label for="exampleInputEntryDate1">Description</label>
            <textarea
              required ={true}
              maxLength = {100}
              type="text"
              className="form-control"
              id="exampleInputEntryDate1"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          &nbsp;
          <Link to="/EvaluationDocs">
            <button className="btn btn-danger">CANCEL</button>
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
}
export default AddmarksDocs;

