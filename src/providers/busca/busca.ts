import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from "lodash";

/*
  Generated class for the BuscaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuscaProvider {

  materias: any;
  materiasFiltradas: any;
  
  id: string;
  foco: any;

  filtros = {};


  constructor(private db: AngularFireDatabase) {
  }

  getMateria(materia: string) {
    /*return this.db.object('/aulas/' + materia + '/').snapshotChanges().map(c => {
      return { key: c.key, ...c.payload.val() };
    }).subscribe(async res => {
      this.materias = res;
      console.log(this.materias);
      this.aplicarFiltros();
    });*/


    return this.db.list('/aulas/' + materia + '/').valueChanges().subscribe((datas) => { 
      console.log("datas", datas)
    },(err)=>{
       console.log("probleme : ", err)
    });
   /* .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.key, ...c.payload.val() }))
    });*/

  }

  private aplicarFiltros() {
    this.materiasFiltradas = _.filter(this.materias, _.conforms(this.filtros));
  }

  //igual
  filtroIgual(propriedade: string, regra: any) {
    this.filtros[propriedade] = val => val == regra;
    this.aplicarFiltros();
  }

  removeFiltro(propriedade: string){
    delete this.filtros[propriedade];
    this[propriedade] = null;
    this.aplicarFiltros();
  }

}
