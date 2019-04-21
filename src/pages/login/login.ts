import { Usuarios } from '../../models/Usuarios';

import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { AES256 } from '@ionic-native/aes-256';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup;
  private usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
    private provider: UsuarioProvider, private aes256: AES256, private formBuilder: FormBuilder,
    private currentUser: Usuarios, private loadingCtrl: LoadingController) {

    this.usuario = this.navParams.data.contact || {};
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.usuario.id],
      id: [this.usuario.id, Validators.required],
      senha: [this.usuario.senha, Validators.required],
    });
  }

  ionViewDidLoad() {
  }

  goToRecuperarSenha() {
    // this.navCtrl.push()
  }

  goToCadastroUsuario() {
    this.navCtrl.push(CadastroUsuarioPage)
  }

  async EfetivarLogIn() {
    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });

    loading.present();

    if (this.form.controls.senha.value == null || this.form.controls.id.value == null) {
      loading.dismiss();
      this.toast.create({ message: 'Um ou mais campos necessários vazios!', duration: 3000 }).present();
      return;
    }

    this.provider.get(this.form.controls.id.value).subscribe(async (data) => {
      var user: any;
      user = data;
      user.id = data.key;
      this.currentUser.setCurrent(user);

     this.aes256.decrypt(this.provider.secureKey, this.provider.secureIV, String(this.currentUser.senha).replace("/n", ""))
        .then(res => {
          if (user != undefined && res == this.form.controls.senha.value) { 
            loading.dismiss();
            this.navCtrl.push(TabsPage);
          }
          else {
            loading.dismiss();
            this.toast.create({ message: 'Login e/ou Senha errado(s)!', duration: 3000 }).present();
            this.form.controls.id.setValue("");
            this.form.controls.senha.setValue("");
            this.usuario = undefined;
          }
        })
        .catch((error: any) => {
          loading.dismiss();
          this.toast.create({ message: 'Login e/ou Senha errado(s)!', duration: 3000 }).present()
        }
        );
    });
  }

}