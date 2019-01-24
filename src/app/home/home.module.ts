import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ItemCardComponent } from './item-card/item-card.component';
import { FooterComponent } from '../components/footer/footer.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  entryComponents: [],
  declarations: [HomePage,ItemCardComponent,FooterComponent]
})
export class HomePageModule {}
