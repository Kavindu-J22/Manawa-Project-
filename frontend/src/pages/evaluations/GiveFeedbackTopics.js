import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './evaluations.css'

function GiveFeedbackTopics() {
    const [groupno, setGroupno] = useState("");
    const [topic, setTopic] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [status, setStatus] = useState("");
    const [feedback, setFeedback] = useState("");


    function sendFeedback(e) {
        e.preventDefault(); //prevent submit event default behaviour
        const newFeedback = {
            groupno,
            topic,
            supervisor,
            status,
            feedback
        };

        axios
            .post("http://localhost:5000/api/sendFeedback/add", newFeedback)
            .then(() => {
                alert("New Evaluation Added");
                window.location = `/EvaluationTopics`;
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div>

            <div className="marksBody">
                <div className="container col-6" onSubmit={sendFeedback}>
                    <form className="addMarks">

                  <center>  <h3>Topic Evaluations</h3></center>
                        <div className="form-group">
                            <label for="exampleInputEntryDate1">Group ID</label>
                            <input
                                required={true}
                                type="text"
                                className="form-control"
                                id="exampleInputEntryDate1"
                                placeholder="Enter ID"
                                onChange={(e) => {
                                    setGroupno(e.target.value);
                                }}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label for="exampleInputEntryDate1">Topic</label>
                            <input
                                required={true}
                                type="text"
                                className="form-control"
                                id="exampleInputEntryDate1"
                                placeholder="Enter Topic"
                                onChange={(e) => {
                                    setTopic(e.target.value);
                                }}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label for="exampleInputmonth">Supervisor</label>
                            <select id="inputState" className="form-control" onChange={(e) => {
                                setSupervisor(e.target.value);
                            }}>
                                <option defaultValue>-- Select Supervisor --</option>
                                <option value="Ms.Dilani">Ms.Dilani</option>
                                <option value="Mr.Dilshan">Mr.Dilshan</option>
                                <option value="Mrs.Uthpala">Mrs.Uthpala</option>
                            </select>
                        </div>

                        <br />
                        <div className="form-group">
                            <label for="exampleInputmonth">Status</label>
                            <select id="inputState" className="form-control" onChange={(e) => {
                                setStatus(e.target.value);
                            }}>
                                <option defaultValue>-- Select Status --</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <label for="exampleInputEntryDate1">Feedback</label>
                            <textarea
                                required={true}
                                maxLength={100}
                                type="text"
                                className="form-control"
                                id="exampleInputEntryDate1"
                                placeholder="Description"
                                onChange={(e) => {
                                    setFeedback(e.target.value);
                                }}
                            />
                        </div>
                        <br />
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
export default GiveFeedbackTopics;

