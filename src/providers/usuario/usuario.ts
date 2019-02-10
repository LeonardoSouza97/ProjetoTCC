import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
  private PATH = '/usuarios/';
  public secureKey: string = 'pshtainkteh1om3t5h7i9e2v4e6s2p0515';
  public secureIV: string = 'sdoeu1n9d8g4aArC';

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('id'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges().map(c => {
      return { key: c.key, ...c.payload.val() };
    });
  }

  save(usuarios: any, state: boolean, senha) {
    return new Promise((resolve, reject) => {
      //    if (usuarios.key) {
      this.db.list(this.PATH)
        .update(usuarios.id, {
          nome: usuarios.nome,
          cpf: usuarios.cpf,
          nasc: usuarios.nasc,
          email: usuarios.email,
          fone: usuarios.fone,
          senha: senha,
          ativo: state,
        })
        .then(() => resolve())
        .catch((e) => reject(e));
      /*      } else {
              this.db.list(this.PATH)
                .push({
                  nome: usuarios.nome,
                  cpf: usuarios.cpf,
                  nasc: usuarios.nasc,
                  email: usuarios.email,
                  fone: usuarios.fone,
                  senha: usuarios.senha,
                  ativo: false,
                })
                .then(() => resolve());
            }*/
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
