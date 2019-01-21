import { Component, OnInit } from '@angular/core';
import { Item } from 'src/data/item.interface';
import items from 'src/data/items';
import { NavController, ModalController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { EnquiryPage } from '../enquiry/enquiry.page';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  item:Item
  id:string
  display
  slideOpts = {
    effect: 'flip'
  };
  constructor(public loadingController: LoadingController,private storage:AngularFireStorage, public toastController: ToastController,public navCtrl:NavController,public modlCtrl:ModalController ,public route:ActivatedRoute,public itemservice:ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(id=>{
      this.item=this.itemservice.getItem(id.id)
    })
    this.display=this.storage.ref('items/'+this.item.display_url).getDownloadURL()
    this.presentLoading()
  }
  listAll(){
    this.navCtrl.goBack()
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 1000
    });
    return await loading.present();
  }

}
