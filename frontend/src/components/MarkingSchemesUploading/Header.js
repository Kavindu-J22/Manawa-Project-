import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
   return (
      <div className="header">
       
         <nav>
            <NavLink activeClassName="active" to="/MarkingUploading" exact={true}>
               Marking Schemes
            </NavLink>
            <NavLink activeClassName="active" to="/FilesList">
               Uploaded Files List
            </NavLink>
         </nav>
      </div>
   );
};

export default Header;
