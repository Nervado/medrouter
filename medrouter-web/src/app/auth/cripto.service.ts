import { Injectable } from "@angular/core";
import * as crypto from "crypto-ts";
import { KEY } from "../api/app.api";

@Injectable({
  providedIn: "root",
})
export class CriptoService {
  constructor() {}

  encryptData(data): string {
    // Encrypt
    if (data) {
      return crypto.AES.encrypt(JSON.stringify(data), KEY).toString();
    }

    return undefined;
  }

  decryptData(data) {
    // Decrypt

    if (data) {
      const bytes = crypto.AES.decrypt(data.toString(), KEY);

      return JSON.parse(bytes.toString(crypto.enc.Utf8));
    }

    return undefined;
  }
}
