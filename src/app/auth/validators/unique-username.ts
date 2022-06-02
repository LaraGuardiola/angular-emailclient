import { Injectable } from '@angular/core'
import { AbstractControl, AsyncValidator } from '@angular/forms'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { AuthService } from '../auth.service'

@Injectable({ providedIn: 'root'})
export class UniqueUsername  implements AsyncValidator {
    constructor(private authService: AuthService){}

    validate = (control: AbstractControl) =>{
        const { value } = control
        return this.authService.usernameAvailable(value)
        .pipe(
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
    }
}
