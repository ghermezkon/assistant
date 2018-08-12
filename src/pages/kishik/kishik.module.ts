import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KishikPage } from './kishik';
import { PipesModule } from '../../api';
@NgModule({
    declarations: [KishikPage],
    imports: [IonicPageModule.forChild(KishikPage), PipesModule],
})
export class KishikModule { }