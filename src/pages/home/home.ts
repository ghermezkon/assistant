import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { MessageService } from '../../api';
import { BmiTaskPage } from './task/bmi.task';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  //-------------------------------------------------------------------------------
  constructor(public navCtrl: NavController, public _msg: MessageService, public popoverCtrl: PopoverController) { }
  //-------------------------------------------------------------------------------
  goToBazrasi() {
    this.navCtrl.push('BazrasiPage');
  }
  goToSecurity() {
    this.navCtrl.push('SecurityPage');
  }
  goToKishik() {
    this.navCtrl.push('KishikPage');
  }
  goToPishnahad() {
    this._msg.showToast('در حال آماده سازی');
  }
  goToSurvey() {
    this._msg.showToast('در حال آماده سازی');
  }
  //-------------------------------------------------------------------------------
  presentMenu() {
    const popover = this.popoverCtrl.create(BmiTaskPage);
    popover.present();
  }
}

