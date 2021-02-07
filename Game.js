class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    
    player2 = createSprite(300,500);
    player2.addImage("player2", player_img);

    players = [player1,player2];
    }
    
    play(){
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index + 1;
            x = 500-allPlayers[plr].distance;
            y = 500;
            
            players[index - 1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            var getName = database.ref('players/player1/name');
            getName.on("value", (data) => {
            getName = data.val();
             })
             fill("black");
             stroke("Black")
             textSize(17);
             strokeWeight(1.5);
            text(getName, player1.x - 20,player1.y + 20);

            var getName2 = database.ref('players/player2/name');
            getName2.on("value", (data) => {
                getName2 = data.val();
            })
            text(getName2, player2.x - 20,player2.y + 20);

        }
        // Give movements for the players using arrow keys
        //index = player.index;

        //if (index === player.index){
            if(keyDown(LEFT_ARROW) && player.index !== null){
                player.distance = player.distance + 6;
                player.update();
             }
       
            if(keyDown(RIGHT_ARROW) && player.index !== null){
                player.distance -= 6;
                player.update();
            }
        //}

        // Create and spawn fruits randomly
        if(frameCount %70 === 0){
            fruits = createSprite(random(100,1000),0,100,100);
            fruits.velocityY = 6;

            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1", fruit1_img);
                case 2: fruits.addImage("fruit2", fruit2_img);
                case 3: fruits.addImage("fruit3", fruit3_img);
                case 4: fruits.addImage("fruit4", fruit4_img);
                case 5: fruits.addImage("fruit5", fruit5_img); 
            }
            fruitGroup.add(fruits);
        }

        
    }

    end(){
       console.log("Game Ended");
    }
}