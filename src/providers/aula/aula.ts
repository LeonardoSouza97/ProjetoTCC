import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the AulaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AulaProvider {
  private PATH = '/solicitacoes/';

  constructor(private db: AngularFireDatabase) { }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges().map(c => {
      return { key: c.key, ...c.payload.val() };
    });
  }

  saveSolicitacoes(aula: any, solicitante: string, tutor: string, key: string) {
    return new Promise((resolve, reject) => {
      this.db.list(this.PATH + '/solicitado/' + solicitante)
        .update(solicitante + key, {
          tutor: tutor,
          solicitante: solicitante,
          hora: aula.hora,
          dataA: aula.dataA,
          materia: aula.materia,
          desc: aula.desc,
          estado: 'Pendente'
        })
        .then(() => {
          this.db.list(this.PATH + '/solicitante/' + tutor)
            .update(tutor + key, {
              tutor: tutor,
              solicitante: solicitante,
              hora: aula.hora,
              dataA: aula.dataA,
              materia: aula.materia,
              desc: aula.desc,
              estado: 'Pendente'
            }).then(() => resolve())
            .catch((e) => reject(e));
        })
        .catch((e) => reject(e));
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  alterarTolken(tolken: number, user: string, op: boolean) {
    if (tolken < 3) {
      return new Promise((reject) => {return reject()});
    } else {
      if (op)
        tolken = tolken + 3;
      else
        tolken = tolken - 3;
    }

    return new Promise((resolve, reject) => {
      this.db.list('/usuarios/')
        .update(user, {
          tolkens: tolken,
        })
        .then(() => resolve())
        .catch((e) => {return reject(e)});
    })
  }
}
