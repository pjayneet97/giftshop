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
/*   getAll(){
    return this.db.collection('items',ref=>ref.limit(3)).valueChanges()
  } */

  getAll(){
    return this.db.collection('items',ref=>ref.limit(9)).get()
  }

  getNext(lastdoc){
    return this.db.collection('items',ref=>ref.startAfter(lastdoc).limit(9)).get()
  }

  getItem(id:string){
    return this.db.collection('items',ref=>ref.where('id','==',id)).get()
  }
  getItemsbyTag(tag:string){
    return this.db.collection('items',ref=>ref.where('tags','array-contains',tag).limit(6)).get()
  }
  getNextbyTag(lastdoc,tag){
    return this.db.collection('items',ref=>ref.where('tags','array-contains',tag).startAfter(lastdoc).limit(6)).get()
  }

}
