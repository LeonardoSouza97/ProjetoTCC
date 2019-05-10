import { SplashScreen } from '@ionic-native/splash-screen';
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Chat } from "../../models/Chat";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from "lodash";
import { pairs } from 'rxjs/observable/pairs';


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
  filtros = {};
  chatpartner = this.chatService.currentChatPartner;
  chatuser = this.chatService.currentChatSender;
  pair = this.chatService.currentChatPairId;
  message: string;
  chatPayload: Chat;
  intervalScroll;
  @ViewChild("content") content: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private chatService: ChatService
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatroomPage");
  }

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ionViewWillLeave() { }


  ngOnInit() {
    var chats: any[] = [];
    // console.log(this.chatService.currentChatPairId);
    return this.db.object('/chats').snapshotChanges().map(c => {
      return { key: c.key, ...c.payload.val() };
    }).subscribe(res => {
      Object.keys(res).forEach(key => {
        var msg = new Object({ key, ...res[key] });

        if (!this.veficaSeAMensagemJaExiste(msg, chats)) {
          chats.push(msg);
        };
        
        this.chats = this.filtrachat(chats);
      });
    });
  }//ngOnInit

  veficaSeAMensagemJaExiste(msg, list) {
    var tempoDaMensagem = msg.time;
    for (let obj of list) {
      if (tempoDaMensagem === obj.time) {
        return true;
      }
    }
    return false;
  }

  filtrachat(chatsToFilter) {
    this.filtros["pair"] = val => val == this.pair;
    chatsToFilter = _.filter(chatsToFilter, _.conforms(this.filtros));
    // console.log(chatsToFilter);
    return chatsToFilter;
  }

  addChat() {
    
    if (this.message && this.message !== "") {
      debugger;
      console.log(this.chats);
      var chatPayload = {
        message: this.message,
        sender: this.chatuser.id,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };

      this.chatService
        .addChat(chatPayload)
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
