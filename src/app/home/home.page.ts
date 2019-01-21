import { Component, OnInit } from '@angular/core';
import { Item } from 'src/data/item.interface';
import { ModalController, LoadingController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mode="list"
  slideOpts = {
    effect: 'flip'
  };
  allitems
  items:Item[]
  selectedItem:Item
  constructor(public loadingController: LoadingController,private modalCtrl:ModalController,public itemService:ItemService ){

  }
  ngOnInit(){
    this.allitems=this.itemService.getAll()
    this.items=this.allitems
    this.presentLoading()
  }
  filter(category:string){
    this.items=this.allitems.filter(element=>{
      if(category=='all'){
        return true
      }
      else{
        return (element.category==category)
      }
    })
    this.presentLoading()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 1000
    });
    return await loading.present();
  }


}
