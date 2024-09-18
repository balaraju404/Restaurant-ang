import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class DBManagerService {

  constructor() { }

  static setData(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  static getData(key: string) {
    return JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem(key))))
  }
  static removeData(key: string) {
    localStorage.removeItem(key)
  }
}
