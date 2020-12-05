class Food{
    constructor(){
       this.food = loadImage("Milk.png")
      foodStock=1
       console.log(foodStock)
       this.lastFed

    }
    getFoodStock(){
         return foodStock;
    }
    updateFoodStock(foodStock){
        foodStock=foodStock;
    }
    deductFoodStock(){
        if(foodStock>0){
             foodStock=foodStock-1;
             }
            }
    bedroom(){
        background(bedroomimg,550,500)

    }
    washroom(){
        background(washroomimg,550,500)

    }
    garden(){
        background(gardenimg,550,500)

    }

      
    
    display(){
        var x =80,y=100;
        imageMode(CENTER)
        image(this.food,720,220,70,70)

        if (foodStock!=0){
            for(var i =0;i<foodStock;i++){
                if (i%10==0){
                   x=80
                   y=y+50; 
                }
                image(this.food,x,y,70,70);
                x=x+30
                
            }
        }
    }
}