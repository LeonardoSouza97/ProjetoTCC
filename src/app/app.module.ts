import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import { InputMaskModule } from 'ionic-input-mask';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';

import { AES256 } from '@ionic-native/aes-256';
import { ConfigProvider } from '../providers/config/config';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
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
    TabsPage,
    IntroPage,
    LoginPage,
    CadastroUsuarioPage,
  ],
  providers: [
    AES256,
    StatusBar,
    SplashScreen,
    ConfigProvider,
    UsuarioProvider,
    LoadingController,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }
