import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private visible: boolean = true;

  constructor() { }

  get isVisible() {
    return this.visible
  }

  public hide() {
    //console.log('hide')
    this.visible = false;
  }
  public show() {
    //console.log('show')
    this.visible = true;
  }
}
