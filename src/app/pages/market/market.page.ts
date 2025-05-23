import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
  standalone:false
})
export class MarketPage {
  constructor(private navCtrl: NavController) {}

  volverHome() {
    this.navCtrl.navigateBack('/home');
  }
}
