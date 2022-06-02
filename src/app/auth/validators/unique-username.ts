import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AbstractControl, AsyncValidator } from '@angular/forms'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable({ providedIn: 'root'})
export class UniqueUsername  implements AsyncValidator {
    constructor(private http: HttpClient){}

    validate = (control: AbstractControl) =>{
        const { value } = control
        const res = this.http.post<any>('https://api.angular-email.com/auth/username',{
            username: value
        }).pipe(
            map(() => {
                return null
            }),
            catchError((err) => {
                //of operator is a shortcut for creating a new Observable
                if(err.error.username){
                    return of({ nonUniqueUsername: true })
                }else{
                    return of({ noConnection: true})
                }
            })
        )
        return res
    }
}
