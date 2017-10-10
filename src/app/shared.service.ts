import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  private config: number;

  setOption(value) {
    this.config = value;
  }

  getConfig() {
    return this.config;
  }

}
