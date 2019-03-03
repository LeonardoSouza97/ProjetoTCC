import { Injectable } from '@angular/core';

@Injectable()

export class Usuarios {

  id: string;
  nome: string;
  cpf: string;
  nasc: Date;
  sexo: string;
  email: string;
  fone: string;
  senha: string;
  ativo: boolean;
  aval: number;
  qtdAval: number;
  tolkens: number;

  constructor() { }

  setCurrent(user: Usuarios) {
    this.id = user.id;
    this.nome = user.nome;
    this.cpf = user.cpf;
    this.nasc = user.nasc;
    this.sexo = user.sexo;
    this.email = user.email;
    this.fone = user.fone;
    this.aval = user.aval  ;
    this.qtdAval = user.qtdAval ;
    this.tolkens = user.tolkens ;
  }
}
