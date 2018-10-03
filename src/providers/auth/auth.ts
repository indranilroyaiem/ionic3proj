import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { User } from '../../models/user';

@Injectable()
export class AuthProvider {

  private authString : string;
  private user : User;

  constructor(
    public http: HttpClient,
    private storage: Storage,
    public events: Events
  ) {}

  // Base64 encode the credentials and store them and user in Ionic Storage.
  public storeCredentials(username : string, password : string, user: User): void {
    let credentials = btoa(username +':'+ password);
    this.storage.set('authString', credentials);
    this.storage.set('user', JSON.stringify(user));
  }

  // Returns true if the user is authenticated.
  public isAuthenticated(): boolean {return this.authString != null};

  // Retrieve the base64 encoded auth string.
  public getAuthString(): string  {return this.authString};

  // Base64 encode and set the local auth string.
  public setAuthString(username: string, password: string): void {
    this.authString = btoa(username +':'+ password);
  }

  // Get the user profile
  public getUser(): User {return this.user};

  // Set the user details and alert anyone listening for changes (the side menu).
  public setUser(user: User): void {
    this.user = user;
    this.events.publish('user:set', this.getUser());
  };

  // Retrieve the credentials and user details from Ionic Storage and set them in the local variables.
  public loadFromStorage(): Promise<void> {
    return new Promise((resolve) => {
      this.storage.forEach((value, key, index) => {
        if (key == 'authString') {
          this.authString = value;
        } else if (key == 'user') {
          this.user = JSON.parse(value);
          this.events.publish('user:set', this.getUser());
        }
      }).then(() => {
        resolve();
      })
    })
  }

  // Logout the user by clearing storage and nulling the variables.
  public destroyAuth(): void {
    localStorage.clear();
    this.storage.clear();
    this.authString = null;
    this.user = null;
  }

}
