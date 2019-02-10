import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AES256 } from '@ionic-native/aes-256';

/**
 * Generated class for the CadastroUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})

export class CadastroUsuarioPage {
  private form: FormGroup;
  private usuario: any;
  private senha: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController, 
    private formBuilder: FormBuilder, private toast: ToastController, private provider: UsuarioProvider,
    private aes256: AES256
  ) {

    this.usuario = this.navParams.data.contact || {};
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.usuario.id],
      id: [this.usuario.id, Validators.required],
      nome: [this.usuario.nome, Validators.required],
      cpf: [this.usuario.cpf, Validators.required],
      nasc: [this.usuario.nasc, Validators.required],
      email: [this.usuario.email, Validators.required],
      fone: [this.usuario.fone, Validators.required],
      senha: [this.usuario.senha, Validators.required],
      senhaConf: [this.usuario.senhaConf, Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  async onSubmit() {

    if (this.form.valid) {
      if (this.form.controls.senha.value != this.form.controls.senhaConf.value) {
        this.toast.create({ message: 'Senhas não batem!', duration: 3000 }).present();
        return;
      }

      this.aes256.encrypt(this.provider.secureKey, this.provider.secureIV, this.form.controls.senha.value)
      .then(res => this.senha = res)
      .catch((error: any) => {
        this.toast.create({ message: 'Houve um erro ao cadastrar o usuário!.', duration: 3000 }).present();
        return;
      });
    
      var obsv = this.provider.get(this.form.controls.id.value).subscribe((data) => {
        if (data.key != null) {
          this.toast.create({ message: 'Id já cadastrada!\nEscolha outra id.', duration: 3000 }).present();
          return;
        }
        else {
          obsv.unsubscribe();
          this.provider.save(this.form.value, false, this.senha)
            .then(() => {
              this.toast.create({ message: 'Usuário cadastrado com sucesso.', duration: 3000 }).present();
              this.navCtrl.pop();
            })
            .catch((e) => {
              this.toast.create({ message: 'Erro ao cadastrar o usuário.', duration: 3000 }).present();
              this.toast.create({ message: e.message, duration: 3000 }).present();
              console.error(e);
            });
        }
      });
    }
  }
}
