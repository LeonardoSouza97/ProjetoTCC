import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Chat } from "../models/Chat";
import { Usuarios} from "../models/Usuarios";
import { UsuarioProvider } from "../providers/usuario/usuario";
import { appconfig } from "../pages/chatroom/Chatconfig";

@Injectable()
export class ChatService { //service do chat 

  // users: AngularFirestoreCollection<Usuarios>;  
  private provider: UsuarioProvider;
  chats: AngularFireList<Chat>;
 

  //pair indica os dois users que esntao na call
  currentChatPairId;
  currentChatPartner;

  constructor(private db: AngularFireDatabase) {
    //Get the tasks collecction
    // this.users = db.collection<Usuarios>(appconfig.users_endpoint);
    this.chats = db.list<Chat>(appconfig.chats_endpoint);
  }

  addChat(chat: Chat) {
    return this.chats.push(chat);
  } //addChat

  createPairId(user1, user2) {
    debugger
    console.log(user1);
    let pairId;
    if (user1.time < user2.time) {
      pairId = `${user1.id}|${user2.id}`;
    } else {
      pairId = `${user2.id}|${user1.id}`;
    }

    return pairId;
  } //createPairString  
}
