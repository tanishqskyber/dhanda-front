import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private toastr: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            // logged in so return true
            //console.log("Redirect to Dash")
            return true;
        }
        console.log("Redirect to login")
        console.log(this.router.url);
        // not logged in so redirect to login page with the return url
        this.router.navigate([ '/'],{queryParams:{username:localStorage.getItem('username')}});
        this.toastr.error('Please Login to Continue!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        return false;
    }
}