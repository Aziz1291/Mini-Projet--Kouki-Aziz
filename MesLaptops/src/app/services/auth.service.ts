import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user.model';

/**
 * AuthService — JWT-based authentication.
 * Replaces the old hardcoded users array with real HTTP calls
 * to the users-microservice (port 8081).
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8081/users';
  token!: string;

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];

  private helper = new JwtHelperService();

  constructor(private router: Router,
              private http: HttpClient) { }

  /** Sends credentials to users-microservice; JWT comes back in Authorization header */
  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }

  /** Stores the raw JWT in localStorage + memory.
   *  Strips the "Bearer " prefix if present — the interceptor re-adds it.
   *  Without this, the Authorization header becomes "Bearer Bearer eyJ..." → 401/403 */
  saveToken(jwt: string) {
    const rawToken = jwt.startsWith('Bearer ') ? jwt.substring(7) : jwt;
    localStorage.setItem('jwt', rawToken);
    this.token = rawToken;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  /** Decodes the JWT payload to extract username (sub) and roles */
  decodeJWT() {
    if (!this.token) return;
    const decoded = this.helper.decodeToken(this.token);
    this.roles      = decoded.roles;
    this.loggedUser = decoded.sub;
  }

  /** Loads token from localStorage (called on app startup) */
  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    if (this.token) {
      this.isloggedIn = true;
      this.decodeJWT();
    }
  }

  getToken(): string {
    return this.token;
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  logout() {
    this.loggedUser  = undefined!;
    this.roles       = undefined!;
    this.token       = undefined!;
    this.isloggedIn  = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  /** Calls POST /users/register to create a new account (not yet active) */
  registerUser(user: User) {
    return this.http.post<User>(this.apiURL + '/register', user, { observe: 'response' });
  }

  /** Calls GET /users/verifyEmail/{code} to activate the account */
  validateEmail(code: string) {
    return this.http.get<User>(this.apiURL + '/verifyEmail/' + code);
  }

  /** Stores the just-registered user so the verifEmail component can auto-login after validation */
  public registredUser: User = new User();

  setRegistredUser(user: User) {
    this.registredUser = user;
  }

  getRegistredUser() {
    return this.registredUser;
  }
}
