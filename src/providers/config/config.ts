import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  constructor() {

  }

  isIntroOn(): any {
    return localStorage.getItem("intro");
  }

  // Grava os dados do localstorage
  setIntroOff() {
    let config = {
      intro: false
    };

    localStorage.setItem("intro", JSON.stringify(config));
  }
}
