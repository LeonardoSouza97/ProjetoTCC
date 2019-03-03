import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { ConfigProvider } from '../providers/config/config';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, configProvider: ConfigProvider) {
    // used for an example of ngFor and navigation

    let config = configProvider.isIntroOn();
    this.platform.ready().then(() => {

      if (config == null) {
        this.rootPage = IntroPage;
        configProvider.setIntroOff();
      } else {
        this.rootPage = LoginPage;
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
}
