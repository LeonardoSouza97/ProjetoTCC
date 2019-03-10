import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuscaProvider } from '../../providers/busca/busca';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the BuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {
  form: FormGroup;
  private filtorAtivo: boolean;
  private busca: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: BuscaProvider,
    private formBuilder: FormBuilder) {
    this.busca = this.navParams.data.contact || {};
    this.createForm();

    this.filtorAtivo = false;
  }

  createForm() {
    this.form = this.formBuilder.group({
      materia: [this.busca.materia, Validators.required]
    });
  }

  ionViewDidLoad() {
  }

  exibirFiltros() {
    this.filtorAtivo = !this.filtorAtivo;
  }

  teste() {
    this.provider.getMateria(this.form.controls.materia.value);
    console.log(this.provider.materiasFiltradas);
  }

  teste2(teste: string) {
    // this.provider.filtroIgual();
    console.log(this.provider.materiasFiltradas);
  }


}
