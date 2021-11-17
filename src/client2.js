"use strict";

require('dotenv').config();
const io = require("socket.io-client");
const HUB_SERVER = process.env.HUB_SERVER || "http://localhost:3000/chat";
const client = io.connect(HUB_SERVER);
const faker = require("faker");
let room = "room1";
let name = faker.name.findName();

client.emit('join',name,room);

setTimeout(() => {
    let user = {
        UserId: faker.datatype.uuid() ,
        Username:name ,
        Room : room ,
        Address : faker.address.streetAddress() ,
    }
    client.emit('new_user',user)
  },1000)

  client.on('new_message',(message,username)=>{
 console.log(`${username} said : ${message}`);
  })