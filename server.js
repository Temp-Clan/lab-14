"use strict";
require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000
const io = require("socket.io")(PORT);
const chat = io.of("/chat");
const listOfLogin = [];
let queue = {} 
chat.on("connection", socket => {
    console.log('connected to Global', socket.id);              
    socket.on("join", (name,room) => {
        let userObj =  {
            time : new Date(),
            user: socket.id,
            room: room,
            username: name,


        }
      
        console.log(`User: ${name} just connected to ${room} with ID: ${socket.id} `);
        listOfLogin.push(userObj); 
        // console.log(listOfLogin);

        if (!queue.hasOwnProperty(room)) {
            queue[room] ={
                'users':{},
                'messages':{}
            }
        }
        console.log(queue); 
    })
    socket.on("new_user",payload => {
        let userId = uuidv4();
        console.log('user id ',userId);
        console.log('queue' , queue);
        // queue.users[userId] = payload
        queue[payload.Room]['users'][userId] = payload ; 
      console.log('this is the payload ' , queue[payload.Room]);
    })
    socket.on("new_message" ,(message,username)=> {
      let messageId= uuidv4();
        // queue[message.Room]['messages'][messageId] = message ; 
        // console.log('this is the passed message', message.Room);
        chat.emit('new_message',message, username);
        console.log('this is the message ant the username ' , message , username);

    })

    // socket.to("room1").emit(message);
    // socket.to(socketId).emit(/* ... */);
    //get all 



})