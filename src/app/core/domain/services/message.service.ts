/**
 * 描述
 * @date 2019-12-01
 * @param {any} {providedIn:"root"}
 * @returns {any}
 */
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  /**
   * @description
   * @type {string[]}
   * @memberof MessageService
   */
  messages: string[] = [];

  /**
   * @description
   * @param {string} message
   * @memberof MessageService
   */
  add(message: string) {
    this.messages.push(message);
  }

  /**
   * @description
   * @memberof MessageService
   */
  clear() {
    this.messages = [];
  }
}