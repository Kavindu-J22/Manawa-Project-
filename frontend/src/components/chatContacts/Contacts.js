import React, { useState, useEffect } from 'react';
import './contacts.css';

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelect, setCurrentSelect] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelect(index);
    changeChat(contact);
  }
  return (
    <>
      {
        currentUserName && (
          <div className='container'>
            <div className='brand'>
              <h3>GRP_SE01</h3>
            </div>
            <div className='contacts'>
              {
                contacts.map((contact, index) => {
                  return (
                    <div className='contact-box'>
                      <div className={`contact ${index === currentSelect ? "selected" : " "}`} key={index} onClick={() => changeCurrentChat(index, contact)} style={{ width: "300px" }}>
                        <div className='username'>
                          <h3 style={{ paddingLeft: '20px' }}>{contact.username}</h3>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="current-user">
              <div className='username'>
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
