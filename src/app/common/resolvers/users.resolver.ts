import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Users} from "../models/users.model";
import {UsersService} from "../services/users.service";
import {Observable} from "rxjs";

@Injectable()
export class UsersResolver implements Resolve<Users> {
    constructor(private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users> {
        return this.usersService.getCurrentUser(route.params['uid']).first();
    }
}