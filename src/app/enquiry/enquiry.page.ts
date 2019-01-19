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
    let date=new Date()
    console.log(date)
    let enq = {item:this.item,data:data.value,status:0,timestamp:date}
    console.log(enq)
    this.db.collection('enquiries').add(enq)
    data.reset()
    this.dismissModal(true)
  }

}
