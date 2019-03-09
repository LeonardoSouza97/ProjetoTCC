import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Storage } from "@ionic/storage";
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuarios } from '../../models/Usuarios';
import { appconfig } from "../../app/app.config";

import { Observable } from "rxjs/Observable";

import { map } from "rxjs/operators";
import { ChatService } from "../../app/app.service";
import { ChatroomPage } from "../chatroom/chatroom";

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
  usuario;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private storage: Storage,
    private provider: UsuarioProvider,    
    private chatService: ChatService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatsPage");
  }

  ngOnInit() {
    var busca : any;   

    this.storage.get("chatuser").then(usuario => {
      this.usuario = usuario;//usuario logado

      this.db
        .collection<Usuarios>(this.provider.get("Meunome"))
        .valueChanges()
        .subscribe(users => {
          // this.availableusers = Usuarios;
          console.log(users);
          this.availableusers = usuario.filter(Usuarios => {
            if (usuario.email != Usuarios.email) {//verificando para o proprio usuario nao aparecer no chat
              return Usuarios;
            }
          });
        });
    });
  }

  goToChat(chatpartner) {
    this.chatService.currentChatPairId = this.chatService.createPairId(
      this.usuario,
      chatpartner
    );

    this.chatService.currentChatPartner = chatpartner;

    this.navCtrl.push(ChatroomPage);
  } //goToChat
}
