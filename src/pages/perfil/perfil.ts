import { Usuarios } from '../../models/Usuarios';
import { AdicaoAulaPage } from '../adicao-aula/adicao-aula';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../../models/Chat';
import { ChatroomPage } from "../chatroom/chatroom";
import { ChatService } from "../../app/app.service";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {  
  private cep: any;
  private materias: Array<any> = new Array;
  private profile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: UsuarioProvider,
    private currrentUser: Usuarios, public http: HttpClient, private loadingCtrl: LoadingController, private chatService: ChatService) {

    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });

    loading.present()

    this.profile = navParams.get('user');

    if (this.profile == undefined) {
      this.profile = currrentUser;
    }

    if (this.profile.cep.replace("-", "").length != 8) {
      return;
    }

    this.http.get('http://viacep.com.br/ws/' + this.profile.cep.replace("-", "") + '/json/').map(res => res).subscribe(data => {
      var cep: any;
      cep = data;

      if (data != undefined && cep.erro != true) {
        this.cep = data;
      } else {
        this.cep = undefined;
      }
    });

    if (this.profile == this.currrentUser) {
      provider.getAulasEnsinadas(this.profile.id).then(async (data) => {
        this.materias = data;
      });
    } else {
      provider.getAulasEnsinadas(this.profile.key).then(async (data) => {
        this.materias = data;
      });
    }

    loading.dismiss();
  }

  ionViewDidLoad() {
  }

  goAdicaoAula() {
    this.navCtrl.push(AdicaoAulaPage);
  }

  goToChat(chatpartner) {
    this.chatService.currentChatPairId = this.chatService.createPairId(this.currrentUser.id,chatpartner.id);
    this.chatService.currentChatPartner = chatpartner.id;

    this.navCtrl.push(ChatroomPage);
  }
}
