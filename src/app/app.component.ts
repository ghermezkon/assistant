import { Component } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HeaderColor } from '@ionic-native/header-color';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public app: App, public alertCtrl: AlertController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard, private headerColor: HeaderColor) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      keyboard.disableScroll(true);
      keyboard.hideKeyboardAccessoryBar(false);
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#E6782B');
      this.headerColor.tint('#E6782B');
      platform.registerBackButtonAction((e) => {
        let nav = this.app.getActiveNavs()[0];
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          let actionSheet = this.alertCtrl.create({
            title: '<span style="font-size:0.2rem;">برای خروج از برنامه مطمئن هستید؟</span>',
            buttons: [
              {
                text: 'خیر',
                role: 'cancel',
              },
              {
                text: 'بله',
                handler: () => {
                  platform.exitApp();
                }
              }
            ]
          });
          actionSheet.present();
        }
      });
    });
  }
}

