import React, { useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const navigate = useNavigate();

  function handleSubmit(e) {
        e.preventDefault();
        navigate(`/chat?name=${name}&room=${room}`)
  }
  
  return (
      <div className="main">
          <div className='container'>
             <h1>Присоединяйся в чат</h1>
             <form className='form' onSubmit={handleSubmit}>
                <input required className='input' name='name' type='text' value={name} placeholder='Ваше имя' onChange={(e)=> setName(e.target.value)}/>
                <input required className='input' name='room' type='text' value={room} placeholder='Название комнаты' onChange={(e)=> setRoom(e.target.value)}/>
                <button type='submit' className='input button'>добавить</button>
              </form>
            </div>
    </div>
  );
}

export default Main;