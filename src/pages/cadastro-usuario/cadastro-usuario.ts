import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

//import { Base64 } from '@ionic-native/base64/ngx';
import { Component } from '@angular/core';
import { AES256 } from '@ionic-native/aes-256';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';

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
  private cep: any;
  private valCEP: boolean;
  private photo: string = "assets/imgs/coinZeta.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController,
    private formBuilder: FormBuilder, private toast: ToastController, private provider: UsuarioProvider,// private base64: Base64,
    private aes256: AES256, private loadingCtrl: LoadingController, public http: HttpClient, private camera: Camera
  ) {

    this.valCEP = false;
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
      sexo: [this.usuario.sexo, Validators.required],
      email: [this.usuario.email, Validators.required],
      fone: [this.usuario.fone, Validators.required],
      senha: [this.usuario.senha, Validators.required],
      senhaConf: [this.usuario.senhaConf, Validators.required],
      cep: [this.usuario.cep, Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  verificarCEP() {
    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });

    loading.present();

    if (String(this.form.controls.cep.value).replace("-", "").length != 8) {
      loading.dismiss();
      this.valCEP = false;
      this.cep = undefined;
      return;
    }

    this.http.get('http://viacep.com.br/ws/' + String(this.form.controls.cep.value).replace("-", "") + '/json/').map(res => res).subscribe(data => {
      var cep: any;
      cep = data;

      if (data != undefined && cep.erro != true) {
        this.valCEP = true;
        this.cep = data;
        loading.dismiss();
      } else {
        this.valCEP = false;
        loading.dismiss();
      }
    });
  }

  getFoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.toast.create({ message: 'Houve um erro ao carregar a imagem!', duration: 3000 }).present();
    });
  }

  async onSubmit() {
    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });

    loading.present();

    if (!this.valCEP) {
      this.toast.create({ message: 'CEP Inválido!', duration: 3000 }).present();
      loading.dismiss();
      return;
    }

    if (this.form.valid) {
      if (this.form.controls.senha.value != this.form.controls.senhaConf.value) {
        this.toast.create({ message: 'Senhas não batem!', duration: 3000 }).present();
        loading.dismiss();
        return;
      }

      this.aes256.encrypt(this.provider.secureKey, this.provider.secureIV, this.form.controls.senha.value)
        .then(res => this.senha = res)
        .catch((error: any) => {
          this.toast.create({ message: 'Houve um erro ao cadastrar o usuário!.', duration: 3000 }).present();
          loading.dismiss();
          return;
        });

      var obsv = this.provider.get(this.form.controls.id.value).subscribe((data) => {
        if (data.key != null) {
          this.toast.create({ message: 'Id já cadastrada!\nEscolha outra id.', duration: 3000 }).present();
          loading.dismiss();
          return;
        }
        else {
          obsv.unsubscribe();
          this.provider.save(this.form.value, false, this.senha, this.photo)
            .then(() => {
              loading.dismiss();
              this.toast.create({ message: 'Usuário cadastrado com sucesso.', duration: 3000 }).present();
              this.navCtrl.pop();
            })
            .catch((e) => {
              loading.dismiss();
              this.toast.create({ message: 'Erro ao cadastrar o usuário.', duration: 3000 }).present();
              //  this.toast.create({ message: e.message, duration: 3000 }).present();
              console.error(e);
            });
        }
      });
    }
  }
}
