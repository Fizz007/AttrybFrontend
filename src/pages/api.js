export default function API(mileage , price , color , host){
    let api = `${host}`

    if(price){
           api=`${host}?price=${price}`
        if(color){
           api=`${host}?price=${price}&color=${color}`
            if(mileage){
                api=`${host}?price=${price}&color=${color}&mileage=${mileage}`
            }
        }
        if(mileage){
            api=`${host}?price=${price}&mileage=${mileage}`
        }
     }
     else if(color){
        api=`${host}?color=${color}`
           
        if(mileage){
            api=`${host}?color=${color}&mileage=${mileage}`
            
         }
     }
     else if(mileage){
        api=`${host}?mileage=${mileage}`
           
     } 
     return api;
}