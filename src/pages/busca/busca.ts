import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BuscaProvider } from '../../providers/busca/busca';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { PerfilPage } from '../perfil/perfil';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
    private formBuilder: FormBuilder, private provider: BuscaProvider, private bd: UsuarioProvider) {
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

  async buscarMateria() {
    this.provider.getMateria(this.form.controls.materia.value);
  }

  removerFiltros() {
    this.provider.limparFiltros();
  }

  async buscarUsuario(tutor) {
    this.bd.get(tutor.key).subscribe(async (data) => {
      var user: any;
      user = data;
      this.navCtrl.push(PerfilPage, {user});
    });

  }

}
