
import React from 'react'
import {  Button } from '@mui/material';


export default function EvaluationsHome() {
    return (
        <>
         <br></br>
   <br></br>
   <br></br>
   <br></br>
        <div>
            <h1>
                Evaluations
            </h1>
            <Button href="/EvaluationTopics"color="inherit">Topics Evaluation</Button>
            <Button href = "/FilesList" color="inherit">Marking Schemes</Button>
            <Button href = "/EvaluationDocs" color="inherit">Documents Evaluation</Button>

            <Button href = "/EvaluationPres" color="inherit">Presentations Evaluation</Button>


        </div>
        </>
    )
}
