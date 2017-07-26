import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CnodePage } from "../cnode/cnode"
import { SettingsPage } from "../settings/settings"

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CnodePage;
  tab2Root = SettingsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
