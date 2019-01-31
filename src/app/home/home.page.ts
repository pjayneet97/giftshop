import { Component, OnInit } from '@angular/core';
import { Item } from 'src/data/item.interface';
import { ModalController, LoadingController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { docChanges } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  covers=[]
  mode='All'
  selectedtag
  slideOpts = {
    effect: 'flip'
  };
  categories=[]
  allitems:Item[]=[]
  items:Item[]
  selectedItem:Item
  tags=[]
  itemsbytag=[]
  lastdoc=null
  lastdoctag=null
  constructor(public storage:AngularFireStorage,public loadingController: LoadingController,private modlCtrl:ModalController,public itemService:ItemService ){

  }
  ngOnInit(){    
    this.getProducts()
    this.getCover()
    this.getTags()


  }
  filter(tag:string){
    this.lastdoctag=null
    if(tag=='All'){
      this.mode='All'
    }
    else{
      this.selectedtag=tag
      this.itemsbytag=[]
      this.getItemsByTag(tag)
      this.mode='tag'
    }

/*     this.allitems.forEach(element=>{
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
    console.log(this.items) */
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait'
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
/*     this.allitems.forEach(element=>{
      element.tags.forEach(data=>{
        if(this.tags.indexOf(data)==-1){
          this.tags.push(data)
        }
      })
    }) */
    this.tags=['All','Handmade','Valentine','Graphics','Bouquet','Crafts','Cards','Accessories']
    
  }

  getProducts(event?){
    if(this.lastdoc==null){
      this.itemService.getAll().subscribe(data=>{
        this.lastdoc=data.docs[data.docs.length-1]
        data.forEach(doc=>{
          this.allitems.push(doc.data())
        })
        this.allitems.forEach(element=>{
          if(element.image_url[0]){
            element.image_url[0]=this.storage.ref(element.image_url[0]).getDownloadURL()
          }
        })
        this.items=this.allitems
      })
    }
    else{
      console.log('called')
      this.itemService.getNext(this.lastdoc).subscribe(data=>{
        this.lastdoc=data.docs[data.docs.length-1]
        data.forEach(doc=>{
          let item = doc.data()
          if(item.image_url[0]){
            item.image_url[0]=this.storage.ref(item.image_url[0]).getDownloadURL()
          }
          this.allitems.push(item)
        })
        this.items=this.allitems
      })
      event.target.complete();
    }
  }
  getItemsByTag(tag:string){
    this.itemService.getItemsbyTag(tag).subscribe(data=>{
      this.lastdoctag=data.docs[data.docs.length-1]
      data.forEach(doc=>{
        let item = doc.data()
          if(item.image_url[0]){
            item.image_url[0]=this.storage.ref(item.image_url[0]).getDownloadURL()
          }
        this.itemsbytag.push(item)
      })
    })
  }

  getmoreByItem(event){
      this.itemService.getNextbyTag(this.lastdoctag,this.selectedtag).subscribe(data=>{
        this.lastdoctag=data.docs[data.docs.length-1]
        data.forEach(doc=>{
          let item = doc.data()
          if(item.image_url[0]){
            item.image_url[0]=this.storage.ref(item.image_url[0]).getDownloadURL()
          }
            this.itemsbytag.push(item)
          
        })
      })
      event.target.complete();
    
  }

  
}
