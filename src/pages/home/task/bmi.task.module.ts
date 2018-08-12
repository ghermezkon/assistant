import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmiTaskPage } from './bmi.task';
@NgModule({
    declarations: [BmiTaskPage],
    imports: [IonicPageModule.forChild(BmiTaskPage)],
})
export class BmiTaskModule { }