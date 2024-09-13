import React from "react";
import {Link} from 'react-router-dom';
import './Card.css';


function Card(props){
    return (
        <Link to={props.navigate}>
            <div className="card">
                <img src = {props.img}
                alt="admin_home_img" />
                <p>{props.name}</p>
            </div>
        </Link>

    );
}
export default Card;