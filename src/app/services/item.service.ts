import { Injectable } from '@angular/core';
import items from 'src/data/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items=items
  constructor() { }
  getAll(){
    return this.items
  }
  getItem(id:string){
    return this.items.find( item => {
      return id==item.id
    })
  }
}
