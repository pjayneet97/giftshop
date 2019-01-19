import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { EnquiryPage } from '../enquiry/enquiry.page';


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
  declarations: [HomePage, ItemDescriptionComponent, ItemCardComponent]
})
export class HomePageModule {}
