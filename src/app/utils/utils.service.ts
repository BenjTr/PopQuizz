import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key) {
    return this.storage.get(key);
  }
}
