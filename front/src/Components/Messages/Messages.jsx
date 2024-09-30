import React from 'react';
import './Messages.css';

function Messages({ messages, name }) {
    return (
        <div className="messages">
            {messages.map((el,i) => {
                const itsMe = el.user.name.trim().toLowerCase() === name.trim().toLowerCase();
                const clasNam = itsMe ? 'me' : 'user';
                return (
                    <div className={'mes '+clasNam} key={i}>
                        <span>{el.user.name}</span>
                        <div className='text'>{el.message}</div>
                    </div>
                )
          })}
    </div>
  );
}

export default Messages;