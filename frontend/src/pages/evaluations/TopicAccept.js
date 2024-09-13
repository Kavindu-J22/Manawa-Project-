import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../evaluations/evaluatedocs.css';
import UpdateIcon from '@mui/icons-material/Update';
import { green } from '@mui/material/colors';


export default function Cosupervisorsreq() {

  const [reqCosup, setreqCosup] = useState([])
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchtitle, setSearchTitle] = useState("");


  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/group`);
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    function getServices() {
      axios.get(`http://localhost:5000/api/group`).then((res) => {
        setreqCosup(res.data)
        //console.log(res.data)   
      }).catch((err) => {
        alert(err)
      })
    }
    getServices();
  }, [reqCosup])



  //   function createPdf() {

  //     var doc = new jsPDF('portrait', 'px', 'a3');
  //     var totalPagesExp = "{total_pages_count_string}"; //placeholder for total number of pages 
  //     doc.autoTable({
  //       didDrawPage: function (data) {

  //         // Header
  //         doc.setFontSize(16);
  //         var fileTitle = "Research Presenations Marks";

  //         doc.text(fileTitle, 40, 100);


  //         // Footer
  //         var pageSize = doc.internal.pageSize;
  //         //jsPDF 1.4+ uses getHeight, <1.4 uses .height
  //         var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
  //         // jsPDF 1.4+ uses getWidth, <1.4 uses .width
  //         var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

  //         doc.autoTable({
  //           html: '#my-table',
  //           startY: pageHeight - 760,
  //           theme: 'grid'
  //         });

  //         var str = "Page " + doc.internal.getNumberOfPages()
  //         // Total page number plugin only available in jspdf v1.0+
  //         if (typeof doc.putTotalPages === 'function') {
  //           str = str + " of " + totalPagesExp;
  //         }
  //         doc.setFontSize(10);
  //         doc.text(str, data.settings.margin.left, pageHeight - 10);
  //       },
  //       margin: {
  //         bottom: 60, //this decides how big your footer area will be
  //         top: 40 //this decides how big your header area will be.
  //       }
  //     });
  //     // Total page number plugin only available in jspdf v1.0+
  //     if (typeof doc.putTotalPages === 'function') {
  //       doc.putTotalPages(totalPagesExp);
  //     }

  //     doc.save('marks.pdf'); //this downloads a copy of the pdf in your local instance.
  //   };
  //   function deletePre(_id) {
  //     axios.delete(`http://localhost:5000/api/evaluatePres/delete/${_id}`)
  //       .then((res) => {
  //         //console.log(res.data);
  //         window.location = `/EvaluationPres`;
  //       })

  //       .catch((error) => {
  //         alert(`Failed to delete the product\n${error.message}`)
  //       })
  //   }


  return (
    <> <div className="reportBody">
      <br></br>
      <br></br>

      <div className="containerDetails">
        <hr />
        <center>
          <h1> Group Details</h1>
        </center>
        <hr />
        <br />
        <input className="search1"
          style={{ width: "10%", height: "30px" }}
          type="text"
          placeholder=" Student 1 ID"
          onChange={(e) => setSearchTitle(e.target.value)} />


        <table className="table table-bordered detailTable" id="my-table">
          <thead className="bg-dark text-light">
            <tr className="detailRaw">
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Student 1</th>
              <th scope="col">Student 2</th>
              <th scope="col">Student 3</th>
              <th scope="col">Student 4</th>
              <th scope="col">Field</th>
              <th scope="col">Supervisor</th>
              <th scope="col">Status</th>
              <th scope="col"> Co Supervisor</th>
              <th scope="col"> </th>
            </tr>
          </thead>

          {loading ? (
            <button class="btn-btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aris-hidden="true"></span>
              Loading </button>
          ) : (
            posts
              .filter((value) => {
                if (searchtitle === "") {
                  return value;
                } else if (value.studentID1?.toLowerCase().includes(searchtitle.toLowerCase())) {

                  return value;
                }


              }).map((reqCo) =>
                <tr>

                  <td className="presentationmarks">{reqCo._id}</td>
                  <td className="presentationmarks">{reqCo.topic}</td>
                  <td className="presentationmarks">{reqCo.studentID1}</td>
                  <td className="presentationmarks">{reqCo.studentID2}</td>
                  <td className="presentationmarks">{reqCo.studentID3}</td>
                  <td className="presentationmarks">{reqCo.studentID4}</td>
                  <td className="presentationmarks">{reqCo.field}</td>
                  <td className="presentationmarks">{reqCo.supervisorName}</td>
                  <td className="presentationmarks">{reqCo.status}</td>
                  <td className="presentationmarks">{reqCo.coSupName}</td>
                  <td>
                    <Link
                      to={`/AcceptRejectTopics/${reqCo._id}`}
                      className="btn btn-sm expenseButton"
                    > <UpdateIcon className="btn-icon" style={{ color: green[600] }} fontSize="small" />
                    </Link>
                    &nbsp;

                  </td>
                </tr>
              )
          )}

        </table>

      </div>

    </div>
    </>
  )

}     