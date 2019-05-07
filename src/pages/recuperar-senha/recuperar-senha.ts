import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuarios } from '../../models/Usuarios';
import { FormBuilder, FormGroup, Validators, EmailValidator,  } from '@angular/forms';
import { LoginPage } from '../login/login';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

/**
 * Generated class for the RecuperarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {
  private form: FormGroup;
  private usuario: any;

  constructor(public navCtrl: NavController,private currentUser: Usuarios,private formBuilder: FormBuilder, public navParams: NavParams, private toast: ToastController,private loadingCtrl: LoadingController,private provider: UsuarioProvider) {
    this.usuario = this.navParams.data.contact || {};
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.usuario.id],
      email: [this.usuario.email, Validators.required],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }
 
  RecuperarSenhaRandom(): string {
    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });
    loading.present();
    if (this.form.controls.email.value == null) {
      loading.dismiss();
      this.toast.create({ message: 'O campo de email deve ser preenchido!', duration: 3000 }).present();
      
      return;
    }
    
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 20; i++) {

      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
      
    }
    this.provider.updateSenha(outString,this.form.controls.email.value);
    this.toast.create({ message: 'Senha nova enviada com sucesso!', duration: 3000 }).present();
    loading.dismiss();
    
    this.navCtrl.push(LoginPage)
    return outString;

  }
  
  /*
  enviaEmail(email,senha){
    let email = {
      *   to: email.value,
      *   subject: 'Recuperação de senha - EqualClass',
      *   body: 'Olá, uma recuperação de senha foi solicitada para a sua conta, aqui está uma nova senha que poderá ser ultilizada:' + senha,
      *   isHtml: true
      * }
  }
    */


  
}
