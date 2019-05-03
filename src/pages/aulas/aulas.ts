import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AulasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aulas',
  templateUrl: 'aulas.html',
})
export class AulasPage {
  private barra: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  showBar(barra: string) {
    if (barra == "Solicitacao") {
      this.barra = false;
    }
    else {
      this.barra = true;
    }
    console.log(this.barra + "->" + barra)
  }
}
