//Create variables here
var dog, happyDog, database, foodS, foodStock
var feed,addFood,Feedtime,LastFed,foodObj,pm
var changeState,getState
var bedroomimg,gardenimg,washroomimg
var readState,gameState,sadDog

function preload()
{
  dog = loadImage("do.png")
  happyDog= loadImage("dog.png")
  bedroomimg = loadImage("Bed Room.png")
  gardenimg =loadImage("Garden.png")
  washroomimg = loadImage("Wash Room.png")
  sadDog =  loadImage("Lazy.png")
  
	//load images here
}

function setup() {
  database=firebase.database();
  createCanvas(500, 800);


  foodObj=new Food()

  dog=createSprite(710,190,10,10)
  dog.addImage(happyDog)
  dog.scale = 0.3

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() { 
  background (46, 139, 87) 

  LastFed=hour()-2

  readState=database.ref('gamestate')
  readState.on("value",function(data){
   gameState=data.val()
  })
  time=hour()
  if (time==(LastFed+1)){
    update("Playing")
    foodObj.garden()
  }
  else if (time==(LastFed+2)){
    update("Sleeping")
    foodObj.bedroom()
  }
  else if (time>(LastFed+2) && time <=(LastFed+4)){
    update("Bathing")
    foodObj.washroom()
  }
  else {
    update("Hungry")
    foodObj.display()
  }

  if(gameState!="Hungry"){
    feed.hide()
    addFood.hide()
    
  }else{
    feed.show()
    addFood.show()
    dog.addImage(sadDog)
  }
  



     

  drawSprites();
  fill("black")
  textSize(30)

if (gameState=="Hungry"){
  text("press Feed the dog  to feed the dog ",100,450)
}

  if (LastFed>12 &&LastFed<23){
  pm =LastFed-12
  text("last fed: "+pm + " PM",100,75)
  }

 else{

    text("last fed: "+LastFed + " AM",100,75)
    }
  
}

function feedDog(){
  if(foodStock!=0){
  foodStock=foodStock-1
  console.log(foodStock)
  
  database.ref('/').update({
    food:foodStock,
    FeedTime:hour()
  })
}
  
}
function addFoods(){
  foodStock++
  console.log("this"+foodStock)
 database.ref('/').update({
 food:foodStock
 })

}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}


