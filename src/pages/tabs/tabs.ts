import { Component } from '@angular/core';

import { HomePage } from '../home/home';

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  //------------------------------------------------------
  constructor() {}
  //------------------------------------------------------
}
