import { Usuarios } from '../../models/Usuarios';
import { AdicaoAulaPage } from '../adicao-aula/adicao-aula';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HttpClient } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: UsuarioProvider,
    private currrentUser: Usuarios, public http: HttpClient, ) {

    if (currrentUser.cep.replace("-", "").length != 8) {
      return;
    }

    this.http.get('http://viacep.com.br/ws/' + currrentUser.cep.replace("-", "") + '/json/').map(res => res).subscribe(data => {
      var cep: any;
      cep = data;

      if (data != undefined && cep.erro != true) {
        this.cep = data;
      } else {
        this.cep = undefined;
      }
    });
  }

ionViewDidLoad() {
}

goAdicaoAula() {
  this.navCtrl.push(AdicaoAulaPage);
}




}
