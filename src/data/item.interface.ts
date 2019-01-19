export interface Item{
    id:string
    title:string
    display_type:string
    display_url:string
    price:number
    cost:number
    description:any
    rating:number
    comments:{name:string,message:string,rating:number}[]
    points:string[]
    customizations:string[]
    deliveries:string[]
    
}