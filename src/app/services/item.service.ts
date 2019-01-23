import { Injectable } from '@angular/core';
import items from 'src/data/items';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from 'src/data/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items:Item[]=[]
  constructor(public db:AngularFirestore) { 

  }
  getAll(){
    return this.db.collection('items').valueChanges()
  }
  getItem(id:string){
/*     return this.items.find( item => {
      return id==item.id
    }) */
    return this.db.collection('items',ref=>ref.where('id','==',id)).valueChanges()
  }
}
