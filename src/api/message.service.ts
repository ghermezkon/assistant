import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    //----------------------------------------------------------------------
    constructor(){}
    //----------------------------------------------------------------------
    validation_msg = {
        'global':[
            { type: 'required', message: 'الزامی' },
        ],
        'mobile': [
            { type: 'required', message: 'الزامی' },
            { type: 'minlength', message: 'شماره همراه باید دارای 11 رقم باشد' },
            { type: 'maxlength', message: 'حداکثر تعداد ارقام شماره همراه باید 11 باشد' },
            { type: 'isMobile', message: 'شماره همراه اشتباه است' },
            { type: 'mobileInUse', message: 'شماره همراه تکراری است' },
        ],
        'melli': [
            { type: 'required', message: 'الزامی' },
            { type: 'minlength', message: 'حداقل تعداد ارقام کد ملی باید 10 باشد' },
            { type: 'maxlength', message: 'کد ملی بیشتر از 10 عدد مجاز نمی باشد' },
        ],
        'password': [
            { type: 'MatchPassword', message: 'رمز عبور همخوانی ندارد' }
        ]
    }
    //----------------------------------------------------------------------   
    public get_message(){
        return this.validation_msg;
    }
    //----------------------------------------------------------------------   
}
