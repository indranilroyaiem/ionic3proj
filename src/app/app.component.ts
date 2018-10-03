import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';

import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { User } from '../models/user';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild('mycontent') nav: NavController
  rootPage: any;

  user: User;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    headerColor: HeaderColor,
    private auth: AuthProvider,
    private menu: MenuController,
    public events: Events
  ) {

    // Load authString and stored user, assuming they exist in storage
    auth.loadFromStorage()
    .then(() => {
      if (auth.isAuthenticated()) {
        this.rootPage = SearchPage;
        menu.enable(true, 'profile-menu');
      } else {
        this.rootPage = LoginPage;
        menu.enable(false, 'profile-menu');
      }
      setTimeout(() => splashScreen.hide(), 500);
    })
    .catch((err) => { // Catch any errors that occured.
      console.log(err);
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      headerColor.tint('#0052cc');
    });

    // Update the menu with any changes in user information
    this.events.subscribe('user:set', (user) => {
      this.user = user;
    })
  }

  // Disable the menu, destroy the auth, and go back to login
  public onLogoutSubmit(): void {
    this.menu.enable(false, 'profile-menu');
    this.auth.destroyAuth();
    this.nav.setRoot(LoginPage,{},{animate: true, direction: 'back'});
  }
}

