import { FormControl, FormGroup } from "@angular/forms";
import * as _ from 'lodash';

export class CustomValidator {
    static isMobile(control: FormControl): any {
        if (control.value !== '' && control.value.length == 11) {
            if (control.value.substring(0, 2) !== '09') return ({ isMobile: true });
            else {
                const count = (str, ch) => _.sumBy(str, x => x === ch);
                if (count(control.value, '1') == 9) return ({ isMobile: true });
                else if (count(control.value, '2') == 9) return ({ isMobile: true });
                else if (count(control.value, '3') == 9) return ({ isMobile: true });
                else if (count(control.value, '4') == 9) return ({ isMobile: true });
                else if (count(control.value, '5') == 9) return ({ isMobile: true });
                else if (count(control.value, '6') == 9) return ({ isMobile: true });
                else if (count(control.value, '7') == 9) return ({ isMobile: true });
                else if (count(control.value, '8') == 9) return ({ isMobile: true });
                else if (count(control.value, '9') == 10) return ({ isMobile: true });
                else return null;
            }
        }
    }
    //------------------------------------------------------------------------------
    static MatchPassword(ac: FormGroup) {
        let password = ac.get('password').value;
        let confirmPassword = ac.get('confirmPassword').value;
        if (password !== '' && confirmPassword !== '') {
            if (password != confirmPassword) {
                ac.get('confirmPassword').setErrors({ MatchPassword: true });
            } else {
                return null;
            }
        }
    }
    //-------------------------------------------------------------------------------
    static isCodeMeli(code: FormControl) {
        if (code.value !== '' && code.value.length == 10) {
            let meli: any = code.value.toString();
            const count = (str, ch) => _.sumBy(str, x => x === ch);
            if (count(code.value, '1') == 10 ||
                count(code.value, '2') == 10 ||
                count(code.value, '3') == 10 ||
                count(code.value, '4') == 10 ||
                count(code.value, '5') == 10 ||
                count(code.value, '6') == 10 ||
                count(code.value, '7') == 10 ||
                count(code.value, '8') == 10 ||
                count(code.value, '9') == 10) return ({ isCodeMeli: true });

            if (code.value.substring(0, 3) === '000') return ({ isCodeMeli: true });
            var sum = 0;
            for (var i = 0; i < 9; i++) {
                sum += (meli.charAt(i) * (10 - i))
            }
            sum = sum % 11;
            if ((sum < 2 && meli.charAt(9) == sum) || (sum >= 2 && meli.charAt(9) == (11 - sum))) return null;
            else return ({ isCodeMeli: true });
        }
    }
}
