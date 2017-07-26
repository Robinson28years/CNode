import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CnodePage} from "../cnode/cnode";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  tab: any;
  limit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getDefaults();
  }
  getDefaults() {
    if (localStorage.getItem('tab') != null) {
      this.tab = localStorage.getItem('tab');
    }else {
      this.tab = "";
    }
    if (localStorage.getItem('limit') != null) {
      this.limit = localStorage.getItem('limit');
    }else {
      this.limit = 25;
    }
  }
  setDefaults() {
    localStorage.setItem('tab', this.tab);
    localStorage.setItem('limit', this.limit);
    this.navCtrl.push(CnodePage);
  }

}
