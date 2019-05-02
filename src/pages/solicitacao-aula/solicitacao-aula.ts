import { Component } from '@angular/core';
import { BuscaPage } from '../busca/busca';
import { Usuarios } from '../../models/Usuarios';
import { AulaProvider } from '../../providers/aula/aula';
import { BuscaProvider } from '../../providers/busca/busca';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SolicitacaoAulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'solicitacao-aula.html',
  selector: 'page-solicitacao-aula',
})

export class SolicitacaoAulaPage {
  private form: FormGroup;
  private aula: any;
  private date: Date;
  private minD: any;
  private maxD: any;
  private minT: any;
  private tutor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
    private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private aulaProvider: AulaProvider,
    private currentUser: Usuarios, private busca: BuscaProvider) {

    this.tutor = navParams.get('tutor');
    this.date = new Date;

    this.minD = this.date.getUTCFullYear();
    this.maxD = this.date.getUTCFullYear();
    this.minT = (this.date.getUTCHours() + 2) + ':' + this.date.getUTCMinutes();
    console.log(this.minT);

    if (this.date.getUTCMonth() < 10) { this.minD = this.minD + "-0" + (this.date.getUTCMonth() + 1); }
    else { this.minD = this.minD + "-" + (this.date.getUTCMonth() + 1); }

    if ((this.date.getUTCMonth() + 7) < 10) { this.maxD = this.maxD + "-0" + (this.date.getUTCMonth() + 7); }
    else { this.maxD = this.maxD + "-" + (this.date.getUTCMonth() + 7); }

    if (this.date.getUTCDate() < 10) { this.minD = this.minD + "-0" + this.date.getUTCDate(); }
    else { this.minD = this.minD + "-" + this.date.getUTCDate(); }

    if ((this.date.getUTCDate() + 3) < 10) { this.maxD = this.maxD + "-0" + (this.date.getUTCDate() + 3); }
    else { this.maxD = this.maxD + "-" + (this.date.getUTCDate() + 3); }

    this.aula = this.navParams.data.contact || {};
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      materia: [this.aula.materia, Validators.required],
      hora: [this.aula.hora, Validators.required],
      dataA: [this.aula.dataA, Validators.required],
      desc: [this.aula.desc, Validators.required],
    });
  }

  ionViewDidLoad() { }

  onSubmit() {
    var key: string;
    key = String(this.form.controls.dataA.value).substr(0, 4) + String(this.form.controls.dataA.value).substr(5, 2) + String(this.form.controls.dataA.value).substr(8, 2) + String(this.form.controls.hora.value).replace(":", "");

    const loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });

    loading.present();

    if (this.form.controls.hora.value == undefined || this.form.controls.dataA.value == undefined) {
      this.toast.create({ message: 'Campos Data e ou Hora estão vazios!', duration: 3000 }).present();
      loading.dismiss();
      return;
    }

    var promise = this.aulaProvider.alterarTolken(this.currentUser.tolkens, this.currentUser.id, false).then(() => {

      
      var obsv = this.aulaProvider.get('solicitado/' + this.tutor + key).subscribe((data) => {
        if (data.key != null) {
          this.toast.create({ message: 'Aula já solicitada!\nVerifique as informações dela em aula.', duration: 3500 }).present();
          loading.dismiss();
          return;
        }
        else {
          obsv.unsubscribe();
          this.aulaProvider.saveSolicitacoes(this.form.value, this.currentUser.id, this.tutor, key)
            .then(() => {
              this.busca.limparFiltros();
              this.busca.tutores = "";
              this.busca.tutoresFiltradas = "";

              loading.dismiss();
              this.toast.create({ message: 'Aula solicitada com sucesso!', duration: 3000 }).present();
              this.navCtrl.push(BuscaPage);
            })
            .catch((e) => {
              this.aulaProvider.alterarTolken(this.currentUser.tolkens, this.currentUser.id, true);
              loading.dismiss();
              this.toast.create({ message: 'Erro ao solicitar aula!', duration: 3000 }).present();
              console.error(e);
            });
        }
      });
    }).catch((e) => {
      this.toast.create({ message: 'Erro ao tranferir tolkens!', duration: 3000 }).present();
      loading.dismiss();
      return;
    });
  }


  /*public teste() {
     this.localNotifications.schedule({
       id: 1,
       text: 'Solicitação de aula',
       //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
       data: { secret: "TESTE" }
     });
  
  
     this.localNotifications.isPresent(1).then(res => {
       if (res == false) {
         this.toast.create({ message: 'Visto', duration: 3000 }).present();
       }
     });
   }*/



}






