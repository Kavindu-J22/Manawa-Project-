import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './evaluations.css'

function AddmarksPres() {
    const [groupno, setGroupno] = useState("");
    const [title, setTitle] = useState("");
    const [mark1, setMark1] = useState("");
    const [mark2, setMark2] = useState("");
    const [mark3, setMark3] = useState("");
    const [mark4, setMark4] = useState("");

    function sendMarksData(e) {
        e.preventDefault(); //prevent submit event default behaviour
        const newPreMarks = {
            groupno,
            title,
            mark1,
            mark2,
            mark3,
            mark4
        };

        axios
            .post("http://localhost:5000/api/evaluatePres/add", newPreMarks)
            .then(() => {
                alert("Marks added for Presenation");
                window.location = `/EvaluationPres`;
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
                    <center>  <h3>Presentations Evaluations</h3></center>
                        <div className="form-group">
                            <label for="exampleInputmonth">Presentation Title</label>
                            <select id="inputState" className="form-control" onChange={(e) => {
                                setTitle(e.target.value);
                            }}>
                                <option defaultValue>-- Select Presentation --</option>
                                <option value="Presentation 1">Presentation 1</option>
                                <option value="Presentation 2">Presentation 2</option>
                                <option value="Proposal Presentation">Proposal Presentation</option>
                            </select>
                        </div>
                        <br />
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
                            <label for="exampleInputEntryDate1">Student 1 marks</label>
                            <input
                                required={true}
                                type="number" min="0" max="100"
                                className="form-control"
                                id="exampleInputEntryDate1"
                                placeholder="0"
                                onChange={(e) => {
                                    setMark1(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEntryDate1">Student 2 marks</label>
                            <input
                                required={true}
                                type="number" min="0" max="100"
                                className="form-control"
                                id="exampleInputEntryDate1"
                                placeholder="0"
                                onChange={(e) => {
                                    setMark2(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEntryDate1">Student 3 marks</label>
                            <input
                                required={true}
                                type="number" min="0" max="100"
                                className="form-control"
                                id="exampleInputEntryDate1"
                                placeholder="0"
                                onChange={(e) => {
                                    setMark3(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEntryDate1">Student 4 marks</label>
                            <input
                                required={true}
                                type="number" min="0" max="100"
                                className="form-control"
                                id="exampleInputEntryDate1"
                                placeholder="0"
                                onChange={(e) => {
                                    setMark4(e.target.value);
                                }}
                            />
                        </div>
                        <br />

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        &nbsp;
                        <Link to="/EvaluationPres">
                            <button className="btn btn-danger">CANCEL</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddmarksPres;

