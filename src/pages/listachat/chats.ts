import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Storage } from "@ionic/storage";
// import { appconfig } from "../../providers/config/config.ts";
import { Usuarios } from '../../models/Usuarios';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Observable } from "rxjs/Observable";

import { map } from "rxjs/operators";
// import { ChatService } from "../../app/app.service";
// import { ChatroomPage } from "../chatroom/chatroom";

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chats",
  templateUrl: "chats.html"
})
export class ChatsPage implements OnInit {
  availableusers: any = [];
  chatuser;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private storage: Storage,
    // private chatService: ChatService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatsPage");
  }

  ngOnInit() {
    //Fetch other users
    //let loggedInUser = this.storage.get("chatuser");

    this.storage.get("chatuser").then(chatuser => {
      this.chatuser = chatuser;

      this.db
        .collection<Usuarios>(UsuarioProvider)
        .valueChanges()
        .subscribe(users => {
          //this.availableusers = users;
          console.log(users);
          this.availableusers = users.filter(user => {
            if (user.email != chatuser.email) {
              return user;
            }
          });
        });
    });
  }

  goToChat(chatpartner) {
    this.chatService.currentChatPairId = this.chatService.createPairId(
      this.chatuser,
      chatpartner
    );

    this.chatService.currentChatPartner = chatpartner;

    this.navCtrl.push(ChatroomPage);
  } //goToChat
}