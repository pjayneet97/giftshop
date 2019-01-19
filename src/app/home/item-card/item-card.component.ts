import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/data/item.interface';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { EnquiryPage } from 'src/app/enquiry/enquiry.page';
import { ItemDetailsPage } from 'src/app/item-details/item-details.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item:Item
  constructor(public toastController: ToastController,public modlCtrl:ModalController,public navCtrl:NavController,public router:Router) { }

  ngOnInit() {
  }
  async buyNow(){
    const modal = await this.modlCtrl.create({
      component: EnquiryPage,
      componentProps: {
        item:this.item
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data)
    if(data){
      this.presentToast()
    }

  }
  viewDetails(item:Item){
    this.router.navigate(['/item-details', item.id]);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Click to Close',
      showCloseButton: true,
      position: 'top',
      duration: 1500,
      closeButtonText: 'Done'
    });
    toast.present();
  }

}
