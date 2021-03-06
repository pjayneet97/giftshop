import { Component, OnInit } from '@angular/core';
import { Item } from 'src/data/item.interface';
import { NavController, ModalController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { EnquiryPage } from '../enquiry/enquiry.page';
import { AngularFireStorage } from '@angular/fire/storage';
import { FullimagemodalPage } from '../fullimagemodal/fullimagemodal.page';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  item:Item={id:null,
    title:null,
    image_url:['"../../../assets/items/blank.png"'],
    vedio_url:"hello",
    price:null,
    about:null,
    description:[],
    customizations:[],
    deliveries:[],
    category:null
}
  id:null
  display=[]
  slideOpts = {
    effect: 'flip'
  };
  loading=true
  constructor(private modalController: ModalController,private storage:AngularFireStorage, public toastController: ToastController,public navCtrl:NavController,public modlCtrl:ModalController ,public route:ActivatedRoute,public itemservice:ItemService) { }

  ngOnInit() {
    this.presentLoading()
    this.route.params.subscribe(data=>{
    this.itemservice.getItem(data.id).subscribe(docs=>{
      docs.forEach(doc=>{
        this.item=doc.data()
        this.item.image_url.forEach(url => {
          this.display.push(this.storage.ref(url).getDownloadURL())
        });
      })
      /* this.loadingController.dismiss() */
      this.dismissLoading()
    })
    })


  }
  listAll(){
    this.navCtrl.back()
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

  presentLoading() {
    /* const loading = await this.loadingController.create({
      message: 'Please wait'
    });
    return await loading.present(); */
    this.loading=true
  }
  dismissLoading(){
    this.loading=false
  }

  openPreview(img) {
    this.modalController.create({
      component: FullimagemodalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }

}
