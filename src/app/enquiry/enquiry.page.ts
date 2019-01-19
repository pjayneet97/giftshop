import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Item } from 'src/data/item.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.page.html',
  styleUrls: ['./enquiry.page.scss'],
})
export class EnquiryPage implements OnInit {
  item:Item
  constructor(public navParams:NavParams,public modlCtrl:ModalController,private db:AngularFirestore) { }

  ngOnInit() {
    this.item=this.navParams.get('item')
    console.log(this.item);
    
  }
  dismissModal(status:boolean=false){
    this.modlCtrl.dismiss(status)
  }
  submit(data:NgForm){
    this.db.collection('enquiries').add(data.value)
    data.reset()
    this.dismissModal(true)
  }

}
