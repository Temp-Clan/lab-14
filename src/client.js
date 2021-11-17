"use strict";
require('dotenv').config();
const io = require("socket.io-client");
const HUB_SERVER = process.env.HUB_SERVER || "http://localhost:3000/chat";
const client = io.connect(HUB_SERVER);
const faker = require("faker");
let room = "room1";
let name = faker.name.findName();
client.emit('join',name,room);
 
let user = {
  UserId: faker.datatype.uuid() ,
  Username:name ,
  Room : room ,
  Address : faker.address.streetAddress() ,
}

setTimeout(() => {

  client.emit('new_user',user)
//   let newMessege= {
//     UserId:user.UserId,
//     Room : room,
//     message:faker.lorem.sentence()
//   }
//   let message1 = faker.lorem.sentence()
//   client.emit('new_message',newMessege);
console.log(process.argv);
const value = process.argv.splice(2)[0];
// let value = prompt('Enter a message: ');
console.log(value);
client.emit('new_message',value,user);
},3000)


client.on('new_message',(message,messageId)=>{
  console.log(`said  ${message}`);
  // console.log(message.split(':')[0]!==user.Username);
  if(message.split(':')[0]!==user.Username)
  {

    client.emit('delete',messageId,user.Room);

  }

});

