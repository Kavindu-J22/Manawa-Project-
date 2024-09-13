import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './evaluatedocs.css';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function EvaluationDocs() {
    
  const [marksDocs, setMarksdocs] = useState([])
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchtitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/evaluateDocs");
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, []);


  useEffect(() => {
     function getServices() {
       axios.get(`http://localhost:5000/api/evaluateDocs`).then((res) => {
        setMarksdocs(res.data)
         //console.log(res.data)   
       }).catch((err) => {
         alert(err)
       })
     }
     getServices();
   }, [marksDocs])

   function createPdf  () {

    var doc = new jsPDF('portrait','px','a3');
    var totalPagesExp = "{total_pages_count_string}"; //placeholder for total number of pages 
    doc.autoTable({
        didDrawPage: function (data) {

            // Header
            doc.setFontSize(16);
            var fileTitle = "Research Marks";

            doc.text(fileTitle, 40, 100);
         

            // Footer
            var pageSize = doc.internal.pageSize;
            //jsPDF 1.4+ uses getHeight, <1.4 uses .height
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

            doc.autoTable({
                html: '#my-table',
                startY: pageHeight - 760,
                theme: 'grid'
            });
    
            var str = "Page " + doc.internal.getNumberOfPages()
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(10);
            doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
        margin: {
            bottom: 60, //this decides how big your footer area will be
            top: 40 //this decides how big your header area will be.
        }
    });
    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    }

    doc.save('marks.pdf'); //this downloads a copy of the pdf in your local instance.
};
//  function deleteService(id){        
//    axios.delete(`http://localhost:8070/servicereport/delete/${id}`) 
//    .then((res) => {
//     //console.log(res.data);
//   })
    
//   .catch((error) => {
//       alert(`Failed to delete the product\n${error.message}`)
//   }) 
// } 

return (
    <> <div className="reportBody">
   <br></br>
   <br></br>
   <br></br>
   <br></br>
  
    <div className="containerDetails">
    <hr />
            <center>
            <h1>Evaluation of Documents</h1>
           </center>
            <hr />
            <input className="search1"
                style={{ width: "10%", height: "30px" }}
                type="text"
                placeholder=" Document Title "
                onChange={(e) => setSearchTitle(e.target.value)} />
              
<br/>
      <table className="table table-bordered detailTable" id="my-table">
        <thead className="bg-dark text-light">
          <tr className="detailRaw">
          <th scope="col">ID</th>
          <th scope="col">Group No</th>
          <th scope="col">Title</th>
          <th scope="col">Marks</th>
          <th scope="col">Feedback</th>
         
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
                                    }else if(value.title?.toLowerCase().includes(searchtitle.toLowerCase())){
                                    
                                        return value;
                                    }


                                }).map((marksDocs) =>
                <tr>
        
            <td className="expenseTableData">{marksDocs._id}</td>
            <td className="expenseTableData">{marksDocs.groupno}</td>
            <td className="expenseTableData">{marksDocs.title}</td>
            <td className="expenseTableData">{marksDocs.total}</td>
            <td className="expenseTableData">{marksDocs.description}</td>
            {/* <td>
           
            &nbsp;
            <button
              className="btn btn-sm expenseButton"
              onClick={() => {if (window.confirm('Are you sure you wish to delete this record?')) deleteService(servicesreports._id)}}
            >
              <DeleteIcon className="btn-icon" style={{color:red[600]}} fontSize="small"/>
            </button>
            </td> */}
            </tr>
              )
          )}
   
</table>
      
      <center>
      <Link to={"/AddmarksDocs"} className="btn btn-warning btn-sm">
        ADD DETAILS 
      </Link>
      &nbsp;&nbsp;
      <button type="button" class="btn btn-danger btn sm" onClick={()=>createPdf()}> Download PDF</button>
      &nbsp;&nbsp;
          {/* <Link to="/Service">
            <button className="btn btn-danger"style={{backgroundColor:blueGrey[300]}}>CANCEL</button>
          </Link> */}
      </center>
    </div>
    
    </div>
    </>
)
        
        }     