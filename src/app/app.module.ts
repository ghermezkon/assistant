import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpClientModule } from '@angular/common/http';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { MediaCapture, } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BmiTaskPage } from '../pages/home/task/bmi.task';

@NgModule({
  declarations: [
    MyApp,
    HomePage, TabsPage, BmiTaskPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'بازگشت',
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      animate: false,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, TabsPage, BmiTaskPage,
  ],
  providers: [
    StatusBar,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FileTransfer,
    FileTransferObject,
    Camera,
    MediaCapture, AndroidPermissions
  ]
})
export class AppModule { }
