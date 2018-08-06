import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "../../api/http.service";

@IonicPage()
@Component({
    selector: 'bazrasi-page',
    templateUrl: 'bazrasi.html'
})
export class BazrasiPage {
    show_card: boolean = false;
    baseForm: FormGroup;
    validation_msg: any;
    //------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService) { }
    //------------------------------------------------
    ionViewWillLoad() {
        this.validation_msg = this._http.validation_msg;
        this.createForm();
    }
    //------------------------------------------------
    createForm() {
        this.baseForm = this.fb.group({
            _id: [''],
            customer_code: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)] ,
            customer_name: ['', Validators.required],
            customer_mobile: ['', Validators.required, Validators.minLength(11), Validators.maxLength(11)],
        })
    }
}