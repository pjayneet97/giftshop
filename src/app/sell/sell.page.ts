import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {

  constructor(public toastController: ToastController,public navCtrl:NavController,private db:AngularFirestore) { }

  ngOnInit() {
  }

  submit(data:NgForm){
    let date=new Date()
    console.log(date)
    let enq = {data:data.value,status:0,timestamp:date}
    console.log(enq)
    this.db.collection('listingenquiries').add(enq)
    data.reset()
    this.presentToast()
    this.navCtrl.back()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tankyou for showing intrest we will contact you shortly',
      showCloseButton: true,
      position: 'top',
      duration: 1500,
      closeButtonText: 'Done'
    });
    toast.present();
  }

}
