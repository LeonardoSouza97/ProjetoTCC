import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { BuscaPage } from '../busca/busca';
import { PerfilPage } from '../perfil/perfil';
import { AulasPage } from '../aulas/aulas';
import { AgendaPage } from '../agenda/agenda';
import { ChatsPage } from '../listachat/chats';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AgendaPage;
  tab2Root = AulasPage;
  tab3Root = BuscaPage;
  tab4Root = HomePage;
  tab5Root = PerfilPage;

  constructor() {

  }
}
