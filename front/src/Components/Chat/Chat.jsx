import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react'
import './Chat.css';
import Messages from '../Messages/Messages';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
const socket = io.connect('http://localhost:5000');

const Chat =()=> {
    const { search } = useLocation();
    const [params, setParams] = useState({room:'', name:''});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isOpenEmoji, setOpenEmoji] = useState(false);
    const [usersInRoom, setUsersInRoom] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))       
        // @ts-ignore
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search])

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setMessages((pre) => [...pre, data]);
        });
    }, []);

    useEffect(() => {
        socket.on('joinRoom', ({ data }) => {
            setUsersInRoom(data.users.length);
        });
    }, [search]);

    const onSendMessage = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', {
           newMessage, params
        })
        setNewMessage('')
        setOpenEmoji(false)
    }

    function onLeftroom() {
        socket.emit('leftRoom', {
            params
        });
        navigate('/')
    }

  return (
      <div className="chat">
          <div className='contain'>
              <header>{`Комната ${params?.room}! В комнате ${usersInRoom} пользователей!`}</header>
              <button style={{width: '200px'}} onClick={onLeftroom} className='button' >Выйти из комнаты</button>
              <Messages messages={messages} name={params.name}/>
              <form onSubmit={onSendMessage} className='chat-form'>
                  <input required value={newMessage} className='input' name='message' type='text'  placeholder='Что вы хотите написать?' onChange={(e)=> setNewMessage(e.target.value)} />
                  <div >
                      <div onClick={() => setOpenEmoji((pre) => !pre)}>EMOJI</div>
                      {isOpenEmoji &&
                          <div className='emojis'>
                             <EmojiPicker onEmojiClick={({emoji}) => setNewMessage(`${newMessage} ${emoji}`)} />
                          </div>}
                  </div>
                  <button type='submit' className='button' >Отправить сообщение</button>
                </form>
          </div>
    </div>
  );
}

export default Chat;