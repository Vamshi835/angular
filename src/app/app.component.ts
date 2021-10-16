import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'food-cart-project';
  loadFeature = 'reciepe';

  onNavigate(feature : string) {

    this.loadFeature = feature;
  }
}
