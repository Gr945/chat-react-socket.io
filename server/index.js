const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const route = require('./route');
const { addUser, findUser, getRoomUsers, removeUser } = require('./users');

app.use(cors({ origin: "*"   }));
app.use(route);
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        // Присоединение к комнате
        socket.join(room);

        // Попробуем добавить пользователя
        const { user, isExist } = addUser({ name, room });

        // Сообщение о добавлении пользователя
        const userMessage = isExist
            ? `${name} снова вернулся`
            : `${name} приветствуем нового собеседника`;

        // Отправка сообщения только текущему клиенту
        socket.emit('message', {
            data: {
                user: { name: 'Admin' },
                message: userMessage
            }
        });

        // Уведомление о присоединении для остальных
        socket.broadcast.to(user.room).emit('message', {
            data: {
                user: { name: 'Admin' },
                message: `Присоединился ${user.name}!`
            }
        });

        // Обновление списка пользователей для всех в комнате
        io.to(user.room).emit('joinRoom', { data: { users: getRoomUsers(user.room) } });
    });

    socket.on('sendMessage', ({newMessage, params}) => {
        const user = findUser(params);

        if (user) {
            io.to(user.room).emit('message', { data: { user, message:newMessage }})
        }
        
    })

    socket.on('leftRoom', ({ params }) => {
        const user = removeUser(params);

        if (user) {
            io.to(user.room).emit('message', { data: { user:{name: 'Admin'}, message: `Пользователь ${user.name} вышел` } });
        }
        io.to(user.room).emit('joinRoom', { data: { users: getRoomUsers(user.room) } })
    })

    io.on('disconnect', () => {
        console.log('Disconnect');
    });
});
server.listen(5000, () => {
    console.log('Server run');
});