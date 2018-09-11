import { Component } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public app: App, public alertCtrl: AlertController, platform: Platform, statusBar: StatusBar, keyboard: Keyboard) {
    platform.ready().then(() => {
      keyboard.disableScroll(true);
      keyboard.hideKeyboardAccessoryBar(false);
      statusBar.overlaysWebView(false);
      statusBar.styleDefault();
      statusBar.backgroundColorByName('purple');
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

