import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'enquiry',
    loadChildren: './enquiry/enquiry.module#EnquiryPageModule' },
  { path: 'item-details/:id',
    loadChildren: './item-details/item-details.module#ItemDetailsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'sell', loadChildren: './sell/sell.module#SellPageModule' },
  { path: 'fullimagemodal', loadChildren: './fullimagemodal/fullimagemodal.module#FullimagemodalPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
