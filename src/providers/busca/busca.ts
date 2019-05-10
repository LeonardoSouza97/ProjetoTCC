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

  tutores: any;
  tutoresFiltradas: any;

  id: string;
  foco: string[];
  perido: string[];
  dias: string[];
  obs: string;

  nvl: Array<string> = ["", "", "", "", "", "", ""];
  dia: Array<string> = ["", "", "", "", "", "", ""];
  per: Array<string> = ["", "", ""];

  filtros = {};

  constructor(private db: AngularFireDatabase) {
  }

  getMateria(materia: string) {
    var tutores: Array<any> = new Array;
    return this.db.object('/aulas/' + materia + '/').snapshotChanges().map(c => {
      return { key: c.key, ...c.payload.val() };
    }).subscribe(async res => {

      this.tutores = undefined;
      this.tutoresFiltradas = undefined;

      Object.keys(res).forEach(key => {
        tutores.push(new Object({ key, ...res[key] }));
      });

      this.tutores = tutores.slice(1);
      this.aplicarFiltros();
    })
  }

  private aplicarFiltros() {
    this.tutoresFiltradas = _.filter(this.tutores, _.conforms(this.filtros));
    console.log(this.tutoresFiltradas);
  }

  private aplicarFiltrosCheckbox(filtro: any[], propriedade: any) {
    var f: boolean = false;
    var i: number = 0;

    filtro.forEach(element => {
      console.log(element);

      if (element != "") {
        this.filtros[propriedade] = val => val.indexOf(element) > -1;

        if (!f) {
          this.tutoresFiltradas = _.filter(this.tutores, _.conforms(this.filtros));
          f = true;
        }
        else {
          this.tutoresFiltradas = _.filter(this.tutoresFiltradas, _.conforms(this.filtros));
        }
      } else {
        i = i + 1;
      }
    });

    if (i == filtro.length) {
      this.removeFiltro(propriedade);
    }
  }

  //igual
  filtroIgual(propriedade: string, regra: any) {
    this.filtros[propriedade] = val => val == regra;
    this.aplicarFiltros();
  }

  filtroFoco(propriedade: string, check: boolean, regra: any) {
    if (!check) this.removeFiltroFoco(propriedade, regra)
    else {
      switch (regra) {
        case "6° Ano - Ensino Fundamental":
          this.nvl[0] = regra;
          break;
        case "7° Ano - Ensino Fundamental":
          this.nvl[1] = regra;
          break;
        case "8° Ano - Ensino Fundamental":
          this.nvl[2] = regra;
          break;
        case "9° Ano - Ensino Fundamental":
          this.nvl[3] = regra;
          break;
        case "1° Ano - Ensino Médio":
          this.nvl[4] = regra;
          break;
        case "2° Ano - Ensino Médio":
          this.nvl[5] = regra;
          break;
        case "3° Ano - Ensino Médio":
          this.nvl[6] = regra;
          break;
      }
    }
    this.aplicarFiltrosCheckbox(this.nvl, propriedade);
  }

  filtroDias(propriedade: string, check: boolean, regra: any) {
    if (!check) this.removeFiltroDias(propriedade, regra)
    else {
      switch (regra) {
        case "Domingo":
          this.dia[0] = regra;
          break;
        case "Segunda-feira":
          this.dia[1] = regra;
          break;
        case "Terça-feira":
          this.dia[2] = regra;
          break;
        case "Quarta-feira":
          this.dia[3] = regra;
          break;
        case "Quinta-feira":
          this.dia[4] = regra;
          break;
        case "Sexta-feira":
          this.dia[5] = regra;
          break;
        case "Sábado":
          this.dia[6] = regra;
          break;
      }
    }
    this.aplicarFiltrosCheckbox(this.dia, propriedade);
  }

  filtroPeriodo(propriedade: string, check: boolean, regra: any) {
    if (!check) this.removeFiltroPeriodo(propriedade, regra)
    else {
      switch (regra) {
        case "Matutino":
          this.per[0] = regra;
          break;
        case "Vespertino":
          this.per[1] = regra;
          break;
        case "Noturno":
          this.per[2] = regra;
          break;
      }
    }
    this.aplicarFiltrosCheckbox(this.per, propriedade);
  }

  removeFiltroFoco(propriedade: string, regra: any) {
    switch (regra) {
      case "6° Ano - Ensino Fundamental":
        this.nvl[0] = "";
        break;
      case "7° Ano - Ensino Fundamental":
        this.nvl[1] = "";
        break;
      case "8° Ano - Ensino Fundamental":
        this.nvl[2] = "";
        break;
      case "9° Ano - Ensino Fundamental":
        this.nvl[3] = "";
        break;
      case "1° Ano - Ensino Médio":
        this.nvl[4] = "";
        break;
      case "2° Ano - Ensino Médio":
        this.nvl[5] = "";
        break;
      case "3° Ano - Ensino Médio":
        this.nvl[6] = "";
        break;
    }
    this.aplicarFiltrosCheckbox(this.nvl, propriedade);
  }

  removeFiltroDias(propriedade: string, regra: any) {
    switch (regra) {
      case "Domingo":
        this.dia[0] = "";
        break;
      case "Segunda-feira":
        this.dia[1] = "";
        break;
      case "Terça-feira":
        this.dia[2] = "";
        break;
      case "Quarta-feira":
        this.dia[3] = "";
        break;
      case "Quinta-feira":
        this.dia[4] = "";
        break;
      case "Sexta-feira":
        this.dia[5] = "";
        break;
      case "Sábado":
        this.dia[6] = "";
        break;
    }
    this.aplicarFiltrosCheckbox(this.dia, propriedade);
  }

  removeFiltroPeriodo(propriedade: string, regra: any) {
    switch (regra) {
      case "Matutino":
        this.per[0] = "";
        break;
      case "Vespertino":
        this.per[1] = "";
        break;
      case "Noturno":
        this.per[2] = "";
        break;
    }
    this.aplicarFiltrosCheckbox(this.per, propriedade);
  }

  removeFiltro(propriedade: string) {
    delete this.filtros[propriedade];
    this[propriedade] = null;
    this.aplicarFiltros();
  }

  limparFiltros() {
    this.filtros = {};
    this.aplicarFiltros();
  }

}
