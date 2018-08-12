import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Observable } from "rxjs";
import { MessageService, HttpService, LoaderService } from "../../api";

@IonicPage()
@Component({
    selector: 'kishik-page',
    templateUrl: 'kishik.html',
})
export class KishikPage {
    kishik_list: Observable<Object>;
    input_search: any;
    //------------------------------------------------
    constructor(public navCtrl: NavController, public _msg: MessageService, public _http: HttpService, public _loader: LoaderService) { }
    //------------------------------------------------
    ionViewWillLoad() {
        this._loader.show().present().then(() => {
            this.kishik_list = this._http.get_branch_kishik();
            this._loader.hide();
        })
    }
}