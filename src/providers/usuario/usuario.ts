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

  save(usuarios: any, state: boolean, senha, photo: string) {
    return new Promise((resolve, reject) => {
      //    if (usuarios.key) {
      this.db.list(this.PATH)
        .update(usuarios.id, {
          nome: usuarios.nome,
          cpf: usuarios.cpf,
          nasc: usuarios.nasc,
          sexo: usuarios.sexo,
          email: usuarios.email,
          fone: usuarios.fone,
          cep: usuarios.cep,
          tolkens: 10,
          qtdAval: 0,
          aval: 0,
          senha: senha,
          ativo: state,
          foto: photo
        })
        .then(() => resolve())
        .catch((e) => reject(e));
      /*      } else { Não mexer substituirá faz Insert
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

  cadAulaUsuario(aula: any, userId: string) {
    return new Promise((resolve, reject) => {
      this.db.list("/aulas/" + aula.controls.materia.value + "/")
        .update(userId, {
          foco: aula.controls.foco.value,
          periodo: aula.controls.periodo.value,
          dias: aula.controls.dias.value,
          obs: aula.controls.obs.value,
        })
        .then(() => resolve())
        .catch((e) => reject(e));
    })
  }

  async getAulasEnsinadas(userId: string) {
    var materias: Array<string> = ["Biologia", "Filosofia", "Fisica", "Geografia", "Historia", "Matematica", "Portugues", "Quimica", "Sociologia"];
    var encontradas: Array<any> = new Array;

    for (var i: number = 0; i < 9; ++i) {
      await this.db.object("/aulas/" + materias[i] + "/" + userId).snapshotChanges().map(c => {
        return { key: c.key, ...c.payload.val() };
      }).subscribe(async (data) => {
        var dados: any = await data;

        if (data.key != null) {
          switch (encontradas.length) {
            case 0: { dados.key = "Biologia"; break; }
            case 1: { dados.key = "Filosofia"; break; }
            case 2: { dados.key = "Física"; break; }
            case 3: { dados.key = "Geografia"; break; }
            case 4: { dados.key = "História"; break; }
            case 5: { dados.key = "Matemática"; break; }
            case 6: { dados.key = "Português"; break; }
            case 7: { dados.key = "Química"; break; }
            case 8: { dados.key = "Sociologia"; break; }
            default: { dados.key = "Outro"; break; }
          } 
        }
        encontradas.push({ dados });
      });
    }
    return encontradas;
  }
}
