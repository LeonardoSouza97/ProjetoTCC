import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Chat } from "../../models/Chat";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase} from 'angularfire2/database';
import * as _ from "lodash";


/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chatroom",
  templateUrl: "chatroom.html",
})
export class ChatroomPage implements OnInit {
  chats: any[] = [];
  chatpartner = this.chatService.currentChatPartner;
  chatuser =this.chatService.currentChatSender;
  message: string;
  chatPayload: Chat;
  intervalScroll;
  @ViewChild("content") content: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private chatService: ChatService,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatroomPage");
  }

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ionViewWillLeave() {}
  

  ngOnInit() {
    var chats: any[] = [];
    console.log(this.chatService.currentChatPairId);
    debugger;
    return this.db.object('/chats' ).snapshotChanges().map(c => {
      return { key: c.key, ...c.payload.val() };
    }).subscribe(res => {     

      Object.keys(res).forEach(key => {
        chats.push(new Object({ key, ...res[key] }));
        console.log(this.chats);
        this.chats = chats;
      });
      this.chats = chats.slice(1);
  }); 
}//ngOnInit

  addChat() {
    if (this.message && this.message !== "") {
      debugger
      console.log(this.chats);
      this.chatPayload = {
        message: this.message,
        sender: this.chatuser.id,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };

      this.chatService
        .addChat(this.chatPayload)
        .then(() => {
          //Clear message box
          this.message = "";

          //Scroll to bottom
          this.content.scrollToBottom(300);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } //addChat

  isChatPartner(senderEmail) {
    return senderEmail == this.chatpartner.id;
  } //isChatPartner
}
