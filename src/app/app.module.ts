import { InputMaskModule } from 'ionic-input-mask';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/intro/intro';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { LoginPage } from '../pages/login/login';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';

import { UsuarioProvider } from '../providers/usuario/usuario';
import { AES256 } from '@ionic-native/aes-256';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    LoginPage,
    CadastroUsuarioPage,
  ],
  imports: [
    InputMaskModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD7ZTSbW2FkKtsh_rLQPRAYcjR9sqC8Pu8",
      authDomain: "projetotcc-6p5tt.firebaseapp.com",
      databaseURL: "https://projetotcc-6p5tt.firebaseio.com",
      projectId: "projetotcc-6p5tt",
      storageBucket: "projetotcc-6p5tt.appspot.com",
      messagingSenderId: "879423759668"
    }),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    LoginPage,
    CadastroUsuarioPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsuarioProvider,
    AES256
  ]
})
export class AppModule { }
