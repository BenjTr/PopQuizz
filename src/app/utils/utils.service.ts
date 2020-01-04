import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from "angular-webstorage-service";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public session: any = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.session[key] = this.storage.get(key);
  }

  getFromLocal(key): void {
    this.session[key] = this.storage.get(key);
  }
}
