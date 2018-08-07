import { Component } from "@angular/core";
import { IonicPage, ToastController, AlertController, NavController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidator, MessageService, HttpService } from "../../api/index";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
    selector: 'bazrasi-page',
    templateUrl: 'bazrasi.html'
})
export class BazrasiPage {
    show_card: boolean = false;
    baseForm: FormGroup;
    textForm: FormGroup;
    validation_msg: any;
    //------------------------------------------------
    constructor(public fb: FormBuilder, public _msg: MessageService, public alertCtrl: AlertController,
        public _http: HttpService, public toastCtrl: ToastController, public navCtrl: NavController) { }
    //------------------------------------------------
    ionViewWillLoad() {
        this.validation_msg = this._msg.get_message();
        this.createForm();
    }
    //------------------------------------------------
    createForm() {
        this.baseForm = this.fb.group({
            _id: [''],
            customer_code: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            customer_name: ['', Validators.required],
            customer_mobile: ['', Validators.compose([CustomValidator.isMobile, Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
            customer_msg: this.fb.group({
                msg_title: [''],
                msg_text: ['']
            })
        })
        this.textForm = this.fb.group({
            msg_title: ['', Validators.required],
            msg_text: ['', Validators.required]
        })
    }
    save() {
        if (this.baseForm.status == 'VALID') {
            let data = this.baseForm.value;
            delete data._id;
            data.customer_msg.msg_title = this.textForm.get('msg_title').value;
            data.customer_msg.msg_text = this.textForm.get('msg_text').value;
            this._http.save(data).subscribe((json: any) => {
                if (json.result.n >= 1) {
                    const alert = this.alertCtrl.create({
                        message: 'با تشکر از حسن نیت شما - شماره پیگیری: ' + json.ops[0].token,
                        buttons: [{
                            text: 'تائید',
                            handler: () => {
                                this.navCtrl.setRoot(HomePage);                                
                            }
                        }]
                    });
                    alert.present();
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'خطا در ارسال اطلاعات، لطفاً مجدد تلاش نمائید',
                        duration: 2000,
                        cssClass: 'toastCss'
                    });
                    toast.present();
                }
            });
        } else {
            let toast = this.toastCtrl.create({
                message: 'لطفاً برنامه را بسته و دوباره تلاش نمائید',
                duration: 2000,
                cssClass: 'toastCss'
            });
            toast.present();
        }        
    }
}