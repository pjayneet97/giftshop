import { Component, OnInit } from '@angular/core';
import { Item } from 'src/data/item.interface';
import { ModalController, LoadingController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  covers=[]
  slideOpts = {
    effect: 'flip'
  };
  categories=[]
  allitems:Item[]
  items:Item[]
  selectedItem:Item
  tags=[]
  constructor(public storage:AngularFireStorage,public loadingController: LoadingController,private modlCtrl:ModalController,public itemService:ItemService ){

  }
  ngOnInit(){    
    this.presentLoading()
    this.itemService.getAll().subscribe(data=>{
      this.allitems=data
      this.items=this.allitems

      /* this.getCategories() */
      this.getTags()
    })
    this.getCover()


  }
  filter(tag:string){
/*     this.items=this.allitems.filter(element=>{
      if(category.toLowerCase()=='all'){
        return true
      }
      else{
        return (element.category.toLowerCase()==category.toLowerCase())
      }
    }) */
    this.items=[]
    this.allitems.forEach(element=>{
      if(tag.toLowerCase()=='all'){
        this.items.push(element)
      }
      else{
        
        element.tags.forEach(data=>{
          if(data.toLocaleLowerCase()==tag.toLocaleLowerCase()){
            console.log(element)
            this.items.push(element)
          }
        })
      }
    })
    console.log(this.items)
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 2000
    });
    return await loading.present();
  }

  getCategories(){
    this.allitems.forEach(element=>{
      if(this.categories.indexOf(element.category)==-1){
        this.categories.push(element.category)
      }
    })
  }
  ionViewWillEnter(){
    this.modlCtrl.dismiss()
  }
  getCover(){
    this.itemService.db.collection('utility').doc('cover').valueChanges().subscribe(data=>{
      let imageurls:{images?:string[]}=data
      imageurls.images.forEach(element => {
        let image= this.storage.storage.ref(element).getDownloadURL()
        this.covers.push(image)
      });
    })
    
  }
  getTags(){
    this.allitems.forEach(element=>{
      element.tags.forEach(data=>{
        if(this.tags.indexOf(data)==-1){
          this.tags.push(data)
        }
      })
    })
    
  }

  
}
