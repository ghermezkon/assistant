import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root',
})
export class HttpService {
    //----------------------------------------------------------------------
    constructor(){}
    //----------------------------------------------------------------------
    validation_msg = {
        'mobile': [
            { type: 'required', message: 'الزامی' },
            { type: 'minlength', message: 'حداقل 11 کاراکتر وارد نمائید' },
            { type: 'maxlength', message: 'حداکثر 11 کاراکتر وارد نمائید' },
            { type: 'isMobile', message: 'شماره همراه اشتباه است' },
            { type: 'mobileInUse', message: 'شماره همراه تکراری است' },
        ],
        'melli': [
            { type: 'required', message: 'الزامی' },
            { type: 'minlength', message: 'حداقل 10 کاراکتر وارد نمائید' },
            { type: 'maxlength', message: 'حداکثر 10 کاراکتر وارد نمائید' },
        ],
        'password': [
            { type: 'MatchPassword', message: 'رمز عبور همخوانی ندارد' }
        ]
    }
    //----------------------------------------------------------------------    
}
