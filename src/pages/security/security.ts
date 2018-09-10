import { Component, NgZone } from "@angular/core";
import { IonicPage, ToastController, AlertController, NavController, ActionSheetController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidator, MessageService, HttpService, LoaderService } from "../../api/index";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from "../home/home";
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture';
import { AndroidPermissions } from "@ionic-native/android-permissions";

@IonicPage()
@Component({
    selector: 'security-page',
    templateUrl: 'security.html'
})
export class SecurityPage {
    show_card: boolean = false;
    baseForm: FormGroup;
    textForm: FormGroup;
    validation_msg: any;
    public progress: number = 0;
    //-------------------------------------------------------------
    imageURI: any;
    imageFileName: any;
    file_status: any;
    token: any = 'null';
    photo_name: any = 'null';
    video_name: any = 'null';
    sound_name: any = 'null';
    //-------------------------------------------------------------
    constructor(public fb: FormBuilder, public _msg: MessageService, public alertCtrl: AlertController,
        public _http: HttpService, public toastCtrl: ToastController, public navCtrl: NavController, public ng_zone: NgZone,
        private transfer: FileTransfer, private mediaCapture: MediaCapture, private androidPermissions: AndroidPermissions,
        private camera: Camera, public _loader: LoaderService, public actionSheetCtrl: ActionSheetController) { }
    //-------------------------------------------------------------
    ionViewWillLoad() {
        this.validation_msg = this._msg.get_message();
        this.createForm();
    }
    //-------------------------------------------------------------
    createForm() {
        this.baseForm = this.fb.group({
            _id: [''],
            customer_code: [''],
            customer_name: [''],
            customer_mobile: ['', Validators.compose([CustomValidator.isMobile, Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
            customer_msg: this.fb.group({
                msg_title: [''],
                msg_text: [''],
                msg_admin: ['null']
            }),
            token: [''],
            photo_name: [''],
            video_name: [''],
            sound_name: [''],
            send_date: [''],
            msg_type: [''],
            res_date: ['null']
        })
        this.textForm = this.fb.group({
            msg_title: ['', Validators.required],
            msg_text: ['', Validators.required]
        })
    }
    //-------------------------------------------------------------
    send_way_photo() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'روش ارسال فایل',
            buttons: [
                {
                    text: 'فراخوانی از دوربین',
                    icon: 'ios-camera',
                    handler: () => {
                        this.getImage(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'فراخوانی از فایل های موجود',
                    icon: 'md-images',
                    handler: () => {
                        this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        actionSheet.present();
    }
    //-------------------------------------------------------------
    getImage(sourceType) {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: sourceType,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: false,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 800,
            targetHeight: 600
        }

        this.camera.getPicture(options).then((imageData) => {
            this.imageURI = imageData;
            this.uploadFile();
        }, (err) => {
            this._msg.showToast('خطا در فراخوانی تصویر');
        });
    }
    //-------------------------------------------------------------
    uploadFile() {
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'file',
            //fileName: this.baseForm.get('customer_mobile').value + '.jpg',
            fileName: 'security.jpg',
            chunkedMode: false,
        }
        fileTransfer.onProgress((progressEvent: ProgressEvent) => {
            this.ng_zone.run(() => {
                if (progressEvent.lengthComputable) {
                    let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    if (progress > 100) progress = 100;
                    if (progress < 0) progress = 0;
                    this.progress = progress;
                }
            });
        });
        this._loader.show().present().then(() => {
            fileTransfer.upload(this.imageURI, encodeURI(this._http.getUrlFile()), options)
                .then((data) => {
                    this.token = data.response.split('.')[0].split('-')[1];
                    this.photo_name = data.response;
                    if (data.responseCode == 200) {
                        this.file_status = 'فایل ضمیمه گردید';
                        this._msg.showToast('فایل ارسال گردید، جهت ادامه بر روی دکمه ذخیره کلیک نمائید');
                        this._loader.hide();
                    } else {
                        this.file_status = 'خطا در ارسال فایل';
                        this._msg.showToast('خطا در ارسال فایل');
                        this._loader.hide();
                    }
                }, (err) => {
                    this._msg.showToast('خطا در فراخوانی تصویر');
                    this._loader.hide();
                });
        });
    }
    //-------------------------------------------------------------
    getVideo() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((res: any) => {
            if (res.hasPermission) {
                let options: CaptureVideoOptions = { limit: 1, duration: 10, quality: 0 };
                this.mediaCapture.captureVideo(options)
                    .then(
                        (data: MediaFile[]) => {
                            const fileTransfer: FileTransferObject = this.transfer.create();
                            let options: FileUploadOptions = {
                                fileKey: 'file',
                                //fileName: this.baseForm.get('customer_mobile').value + '.' + data[0].name.split('.')[1],
                                fileName: 'security' + '.' + data[0].name.split('.')[1],
                                chunkedMode: false,
                            }
                            fileTransfer.onProgress((progressEvent: ProgressEvent) => {
                                this.ng_zone.run(() => {
                                    if (progressEvent.lengthComputable) {
                                        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                                        if (progress > 100) progress = 100;
                                        if (progress < 0) progress = 0;
                                        this.progress = progress;
                                    }
                                });
                            });
                            this._loader.show().present().then(() => {
                                fileTransfer.upload(data[0].fullPath, encodeURI(this._http.getUrlFile()), options)
                                    .then((data) => {
                                        this.token = data.response.split('.')[0].split('-')[1];
                                        this.video_name = data.response;
                                        if (data.responseCode == 200) {
                                            this.file_status = 'فایل ضمیمه گردید';
                                            this._msg.showToast('فایل ارسال گردید، جهت ادامه بر روی دکمه ذخیره کلیک نمائید');
                                            this._loader.hide();
                                        } else {
                                            this.file_status = 'خطا در ارسال فایل';
                                            this._msg.showToast('خطا در ارسال فایل');
                                            this._loader.hide();
                                        }
                                    }, (err) => {
                                        this._msg.showToast('خطا در فراخوانی فیلم');
                                        this._loader.hide();
                                    });
                            });
                        },
                        (err: CaptureError) => console.error(err)
                    );
            } else {
                this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]).then((newRes: any) => {
                    if (newRes.hasPermission)
                        this._msg.showToast('دسترسی به دوربین صادر گردید');
                    else this._msg.showToast('اجازه دسترسی به دوربین داده نشد');
                });
            }
        });
    }
    //-------------------------------------------------------------
    getSound() {
        let options: CaptureAudioOptions = { limit: 1, duration: 10 };
        this.mediaCapture.captureAudio(options)
            .then(
                (data1: MediaFile[]) => {
                    const fileTransfer: FileTransferObject = this.transfer.create();
                    let options: FileUploadOptions = {
                        fileKey: 'file',
                        //fileName: this.baseForm.get('customer_mobile').value + '.' + data1[0].name.split('.')[1],
                        fileName: 'security' + '.' + data1[0].name.split('.')[1],
                        chunkedMode: false,
                    }
                    fileTransfer.onProgress((progressEvent: ProgressEvent) => {
                        this.ng_zone.run(() => {
                            if (progressEvent.lengthComputable) {
                                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                                if (progress > 100) progress = 100;
                                if (progress < 0) progress = 0;
                                this.progress = progress;
                            }
                        });
                    });
                    this._loader.show().present().then(() => {
                        fileTransfer.upload(data1[0].fullPath, encodeURI(this._http.getUrlFile()), options)
                            .then((data) => {
                                this.token = data.response.split('.')[0].split('-')[1];
                                this.sound_name = data.response;
                                if (data.responseCode == 200) {
                                    this.file_status = 'فایل ارسال گردید';
                                    this._msg.showToast('فایل ارسال گردید، جهت ادامه بر روی دکمه ذخیره کلیک نمائید');
                                    this._loader.hide();
                                } else {
                                    this.file_status = 'خطا در ارسال فایل';
                                    this._msg.showToast('خطا در ارسال فایل');
                                    this._loader.hide();
                                }
                            }, (err) => {
                                this._msg.showToast(err.toString());
                                this._loader.hide();
                            });
                    });
                },
                (err: CaptureError) => console.error(err)
            );
    }
    //-------------------------------------------------------------
    save() {
        this._loader.show().present().then(() => {
            if (this.baseForm.status == 'VALID') {
                let data = this.baseForm.value;
                delete data._id;
                data.customer_msg.msg_title = this.textForm.get('msg_title').value;
                data.customer_msg.msg_text = this.textForm.get('msg_text').value;
                data.token = this.token;
                data.photo_name = this.photo_name;
                data.video_name = this.video_name;
                data.sound_name = this.sound_name;
                data.send_date = Date.now();
                data.msg_type = 'security';
                this._http.save(data).subscribe((json: any) => {
                    if (json) {
                        const alert = this.alertCtrl.create({
                            title: 'شماره پیگیری: ' + json.token,
                            message: 'با تشکر از حسن نیت شما',
                            enableBackdropDismiss: false,
                            buttons: [{
                                text: 'تائید',
                                handler: () => {
                                    this.navCtrl.setRoot(HomePage);
                                }
                            }]
                        });
                        alert.present();
                        this._loader.hide();
                    } else {
                        this._msg.showToast('خطا در ارسال اطلاعات، لطفاً مجدد تلاش نمائید');
                        this._loader.hide();
                    }
                });
            } else {
                this._msg.showToast('لطفاً برنامه را بسته و دوباره تلاش نمائید');
                this._loader.hide();
            }
        });
    }
    //-------------------------------------------------------------
}