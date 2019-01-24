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
  covers=['../../../assets/cover1.jpeg']
  slideOpts = {
    effect: 'flip'
  };
  categories=[]
  allitems:Item[]
  items:Item[]
  selectedItem:Item
  constructor(public loadingController: LoadingController,private modalCtrl:ModalController,public itemService:ItemService ){

  }
  ngOnInit(){
    this.presentLoading()
    this.itemService.getAll().subscribe(data=>{
      this.allitems=data
      this.items=this.allitems
      this.getCategories()
    })


  }
  filter(category:string){
    this.items=this.allitems.filter(element=>{
      if(category.toLowerCase()=='all'){
        return true
      }
      else{
        return (element.category.toLowerCase()==category.toLowerCase())
      }
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 2000
    });
    return await loading.present();
  }

  getCategories(){
    this.categories.push('All')
    this.allitems.forEach(element=>{
      if(this.categories.indexOf(element.category)!=-1){
        //nothing
      }
      else{
        this.categories.push(element.category)
      }    
    })
  }

  
}
