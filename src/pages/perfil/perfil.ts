import { Usuarios } from '../../models/Usuarios';
import {AdicaoAulaPage } from '../adicao-aula/adicao-aula';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

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
  private usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: UsuarioProvider,
    private currrentUser: Usuarios) { }

  ionViewDidLoad() {
  }

  goAdicaoAula() {
    this.navCtrl.push(AdicaoAulaPage);
  }

}
