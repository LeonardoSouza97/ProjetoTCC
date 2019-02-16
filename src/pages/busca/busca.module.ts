import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaPage } from './busca';

@NgModule({
  declarations: [
    BuscaPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaPage),
  ],
})
export class BuscaPageModule {}
