import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CnodeService} from "../../app/services/cnode.service";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the CnodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cnode',
  templateUrl: 'cnode.html',
})
export class CnodePage {
  items: any;
  tab: any;
  limit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cnodeservice: CnodeService) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CnodePage');
  // }

  ngOnInit(){
    this.getDefaults();
    this.cnodeservice.getPosts(this.tab, this.limit).subscribe(response => {
      this.items = response.data;
    });
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
      this.limit = null;
    }
  }
  viewItem(item) {
    this.navCtrl.push(DetailsPage, {
      item: item
    })
  }
  changeTab() {
    this.cnodeservice.getPosts(this.tab, null).subscribe(response => {
      this.items = response.data;
    });
  }

}
