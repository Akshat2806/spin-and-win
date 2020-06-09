//Set up basic game with Phaser

//brackets IDE

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}

var canSpin;var music;



let config = {
    width : 800,
    height : 600,
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};
let game = new Phaser.Game(config);
    
function preload(){
    //load an image
    console.log(this);
    this.load.image('background',"Assets/back.jpg");
    this.load.image('wheel',"Assets/wheel.png");
    
    this.load.image('stand',"Assets/stand.png"); this.load.image('pin',"Assets/pin.png");
    this.load.image('button',"Assets/button.png");
    this.load.audio('drum',"Assets/drum.mp3");
    
}

function create(){
    //create that image
    let W = game.config.width;
    let H = game.config.height;
    
    this.add.sprite(0,0,'background');

    
    let pin = this.add.sprite(W/2,H/2-250,'pin').setScale(0.25);
    
    pin.depth = 5;
    
    this.add.sprite(W/2,H/2 + 250,'stand').setScale(0.25);
    
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25); 
    console.log(this.wheel.depth);
//    this.input.on("pointerdown",spinwheel,this);
    
    //button
    let button=this.add.sprite(W/2+250,H-50,'button').setScale(0.60);
    button.depth=1;
    button.setInteractive().on('pointerdown',spinwheel,this);
    
     music = this.sound.add('drum');
    
    canSpin = true;
    
     font_style = {
        font : "bold 30px Raleway ",
        align : "center",
        color : "black",
    }
    this.game_text = this.add.text(50,0,"Spin & Win",font_style);
    
}



function update(){
    console.log("In Update");
    //this.wheel.angle -= 1;
    
    
}

function spinwheel(){
    
    
    if (canSpin) {
            console.log("Time to spin the wheel");
    
    let rounds = Phaser.Math.Between(3,5);
    console.log(rounds);
    
    let extra_degrees = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_degrees;
        
        let idx = prizes_config.count - 1 - Math.floor(extra_degrees/(360/prizes_config.count));
                
        music.play();
        
        canSpin = false;
        

    
    let tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease:"Cubic.easeOut",
        duration: 6500,
        callbackScope:this,
         onComplete: function(tween){
             this.game_text.setText("You won " + prizes_config.prize_names[idx]);
                          
             canSpin = true;music.stop();

             
             
 
                 
 
                    
                    
                },
        
    });
            
        }
   
}


                        
