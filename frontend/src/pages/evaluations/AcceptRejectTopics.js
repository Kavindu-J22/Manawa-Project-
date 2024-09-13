import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import '../evaluations/evaluations.css';

function AcceptRejectTopics() {
  const [studentID1, setstudentID1] = useState("");
  const [studentID2, setstudentID2] = useState("");
  const [studentID3, setstudentID3] = useState("");
  const [studentID4, setstudentID4] = useState("");
  const [field, setfield] = useState("");
  const [supervisorName, setsupervisorName] = useState("");
  const [topic, settopic] = useState("");
  const [status, setstatus] = useState("");
  const [coSupName, setcoSupName] = useState("");

  //retrieve relevent data form relavent fields

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/group/get/${id}`)
      .then((res) => {
        // (res.data);
        console.log(res.data.group);
        setstudentID1(res.data.group.studentID1);
        setstudentID2(res.data.group.studentID2);
        setstudentID3(res.data.group.studentID3);
        setstudentID4(res.data.group.studentID4);
        setfield(res.data.group.field);
        setsupervisorName(res.data.group.supervisorName);
        settopic(res.data.group.topic);
        setstatus(res.data.group.status);
        setcoSupName(res.data.group.coSupName);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //update data 
  function sendUpdateDetails(e) {
    e.preventDefault();//prevent submit event default behaviour
    const updateDetails = {
      studentID1,
      studentID2,
      studentID3,
      studentID4,
      field,
      supervisorName,
      topic,
      status,
      coSupName
    }
    axios.put(`http://localhost:5000/api/group//update/${id}`, updateDetails).then(() => {
      alert("Sent sucessfully");
      window.location = `/TopicAccept`;

    }).catch((err) => {
      alert(err);
    })
  }

  return (
    <>
    

    <div className="marksBody">
      <div className="container col-6" onSubmit={sendUpdateDetails}>
        <form className="addMarks">
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Student 1</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"

              value={studentID1}
              onChange={(e) => {
                setstudentID1(e.target.value);
              }} disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Student 2</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"

              value={studentID2}
              onChange={(e) => {
                setstudentID2(e.target.value);
              }} disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Student 3</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"

              value={studentID3}
              onChange={(e) => {
                setstudentID3(e.target.value);
              }} disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Student 4</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"
              value={studentID4}
              onChange={(e) => {
                setstudentID4(e.target.value);
              }} disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Field</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"
              value={field}
              onChange={(e) => {
                setfield(e.target.value);
              }} disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Supervisor</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"
              value={supervisorName}
              onChange={(e) => {
                setsupervisorName(e.target.value);
              }} disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputCategory">Topic</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputexpenseCategory1"
              value={topic}
              onChange={(e) => {
                settopic(e.target.value);
              }} disabled
            />
          </div>
          {/* <div className="form-group">
          <label htmlFor="exampleInputCategory">Request Co supervisor</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputexpenseCategory1"
            placeholder="Enter Expense Category"
            value = {topic}
            onChange = {(e)=>{
                settopic(e.target.value);
            }}disabled
          />
        </div> */}
        <div className="form-group">
            <label for="exampleInputmonth">Status</label>
            <select id="inputState" className="form-control" onChange={(e) => {
              setstatus(e.target.value); 
            }} >
              <option value={status}></option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>


            </select>
          </div>
          {/* <div className="form-group">
            <label for="exampleInputmonth">Request Co Supervisor</label>
            <select id="inputState" className="form-control" onChange={(e) => {
              setcoSupName(e.target.value); 
            }}>
              <option value={coSupName}></option>
              <option value="First, find a suitable topic">Rejected</option>
              <option value="Ms. Hansi">Ms. Hansi</option>
              <option value="Mr. Nalaka">Mr. Nalaka</option>
              <option value="Dr. Dilshan">Dr. Dilshan</option>
              <option value="Mrs. Disni">Mrs. Disni</option>
              <option value="Ms. Kushnara">Ms. Kushnara</option>


            </select>
          </div> */}
          <button type="submit" className="btn btn-success">
            Send
          </button>
          &nbsp;


        </form>
      </div>
    </div>
    </>
  );
}
export default AcceptRejectTopics;