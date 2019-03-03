import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuarios } from '../../models/Usuarios';

/**
 * Generated class for the AdicaoAulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicao-aula',
  templateUrl: 'adicao-aula.html',
})
export class AdicaoAulaPage {
  private form: FormGroup;
  private aula: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private provider: UsuarioProvider, public currentUser: Usuarios, private loadingCtrl: LoadingController,
    private toast: ToastController) {

    this.aula = this.navParams.data.contact || {};
    this.createForm();
  }

  ionViewDidLoad() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      foco: [this.aula.foco, Validators.required],
      materia: [this.aula.materia, Validators.required],
      obs: [this.aula.obs],
    });
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });

    loading.present();

    /*var obsv = this.provider.get(this.form.controls.id.value).subscribe((data) => {
      if (data.key != null) {
        loading.dismiss();
        return;
      }
      else {
        obsv.unsubscribe();*/
        this.provider.cadAulaUsuario(this.form, this.currentUser.id)
          .then(() => {
            loading.dismiss();
            this.navCtrl.pop();
            this.toast.create({ message: 'Aula adicionada com sucesso!', duration: 3000 }).present();
          })
          .catch((e) => {
            loading.dismiss();
            this.toast.create({ message: 'Erro ao adicionar aula!', duration: 3000 }).present();
            console.error(e);
          });
     // }
   // });
  }

}
