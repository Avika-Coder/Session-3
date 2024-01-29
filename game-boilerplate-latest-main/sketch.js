var bg_img;
var playButton,aboutButton;
var gameState="wait";
var player,player_img1;
var enemy1img,enemy2img;
var enemyGroup;

function preload(){
    bg_img = loadImage("assets/Jungle.gif");
    bg1=loadImage("assets/background-2.jpg")
    player_img=loadImage("assets/hunter-R.png")
    enemy1img=loadImage("assets/spike.png")
    enemy2img=loadImage("assets/star.png")


}


function setup(){
    createCanvas(windowWidth,windowHeight)
    playButton = createImg("assets/play_button.png");
    playButton.position(275,height-190);
    playButton.size(275, 200);
    playButton.hide();

    aboutButton = createImg("assets/About_button.png");
    aboutButton.position(275, height-390);
    aboutButton.size(275, 200);
    aboutButton.hide();

    player = createSprite(400, 700);
    player.addImage("main", player_img);
    player.visible=false;

    enemyGroup = new Group();


}

function draw(){
    if (gameState=="wait"){
        background(bg_img)
        playButton.show()
        aboutButton.show()
        

        aboutButton.mousePressed(() => {
            playButton.hide();
            aboutButton.hide();
            gameState = "about";
        })

        playButton.mousePressed(() => {
            playButton.hide();
            aboutButton.hide();
            gameState = "play";
        })
    }

    if (gameState=="about"){
        aboutGame();
        
    }

    if (gameState=="play"){
        background(bg1);
        player.visible=true;
        spawnEnemies();

    }
    drawSprites()


}

function aboutGame() {
    swal({
        title: "About Game = How to Play!!",
        text: "Welcome to the jungle!. To save the animals there you have to shoot the enemy. \n Use Arrow keys to move and Space Bar to jump!",
        textAlign: "center",
        imageUrl: "assets/Jungle.gif",
        imageSize: "250x250",
        confirmButtonText: "Lets save the wilderness",
        confirmButtonColor: "brown",
    },
    function () {
        gameState = "wait"
    }
)
}

function spawnEnemies() {
    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 530))
        enemy = createSprite(width, randy);
        enemy.scale = 0.5
        enemy.velocityX = -20;
        //enemy.debug = true;

        var randy1 = Math.round(random(0, 30))
        var randx1 = Math.round(random(400, width))

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                enemy.x = randx1;
                enemy.y = randy1;
                enemy.addImage(enemy1img)
                //enemy.debug=true;
                enemy.velocityX = -10;
                enemy.velocityY = 10;
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2img)
                //enemy.setCollider("rectangle", 0, 0, 100, 100)
                enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            default: break;

        }


        enemyGroup.add(enemy);



    }
}