import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular'
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { AES256 } from '@ionic-native/aes-256';


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
    private provider: UsuarioProvider, private aes256: AES256, private formBuilder: FormBuilder) {

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
    console.log('ionViewDidLoad LoginPage');
  }

  goToRecuperarSenha() {
    // this.navCtrl.push()
  }

  goToCadastroUsuario() {
    this.navCtrl.push(CadastroUsuarioPage)
  }

  async EfetivarLogIn() {

    if (this.form.controls.senha.value == null || this.form.controls.id.value == null) {
      this.toast.create({ message: 'Um ou mais campos necessários vazios!', duration: 3000 }).present();
      return;
    }

    this.provider.get(this.form.controls.id.value).subscribe(async (data) => {
      var user: any;
      user = data;

      this.aes256.decrypt(this.provider.secureKey, this.provider.secureIV, String(user.senha).replace("/n", ""))
        .then(res => {
          if (user != undefined && res == this.form.controls.senha.value) {
            this.navCtrl.push(HomePage);
          }
          else {
            this.toast.create({ message: 'Login e/ou Senha errado(s)!', duration: 3000 }).present();
            this.form.controls.id.setValue("");
            this.form.controls.senha.setValue("");
            this.usuario = undefined;
          }
        })
        .catch((error: any) => this.toast.create(
          { message: 'Login e/ou Senha errado(s)!', duration: 3000 }).present()
        );

    });
  }
}


