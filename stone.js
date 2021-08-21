class Stone{
    constructor(x,y,width,height){
    var options ={
        restitution:0.8
    }
    
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x,y,width,height,options);
    World.add(world,this.body);
    this.image = loadImage("stone.png");

    }
    
    display(){
    var pos = this.body.position;
    
    push();
    translate(pos.x,pos.y);
    fill("white"); 
    
    //ellipseMode(CENTER);
    //ellipse(0,0,this.width,this.height)
    imageMode(CENTER);
  image(this.image,0,0,this.width,this.height);
    pop(); 
    
    }
    
    
    }