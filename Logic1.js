var logicArray1=[];
var logicArray1Child=[];
var roomPosition=[];
var width=100;
var height=100;
var playerX=0;
var playerY=0;
var rooms=0;
var monsters=0;
var helpIsActive=false;
var weaponAdded=false;
var numOfHealth=0;
//For play
var bosWasAdded=false;
var playerHealth=100;
var playerAttack=5;
var playerLevel=1;
var weapon="stick";
var nextLevelXP=60;
var dungeon=1;
var monstersHealth={};
var teleportWasAdded=false;
var boss={};
var replay1=false;
var bossWasAddedInRender=false;

function setUpLogicArray(){
for(var i=0;i<height;i++){
    for(var k=0;k<width;k++){
        
        logicArray1Child.push("wall");
    }
    logicArray1.push(logicArray1Child);
    logicArray1Child=[];
 }
}


function makeRooms(){
    var emergencyBreak=0;
    var randomWith=0;
    var randomHeight=0;
    while(emergencyBreak<500 && rooms<15){
        emergencyBreak++;
       var again=false;
       var randomWidthBeginning=Math.random() * (80-5)+5;
       var randomWidthEnd = randomWidthBeginning+15;
       var randomHeightBeginning=Math.random() *(height-20)+5;
       var randomHeightEnd = randomHeightBeginning+12;
       
       
       randomWidthEnd=Math.round(randomWidthEnd);
       randomWidthBeginning=Math.round(randomWidthBeginning);
       randomHeightEnd=Math.round(randomHeightEnd);
       randomHeightBeginning=Math.round(randomHeightBeginning);
     
       for(var i=randomHeightBeginning;i<randomHeightEnd;i++){
               for(var k=randomWidthBeginning;k<randomWidthEnd;k++){
                   if(k!==0 && k!==width && i>5 && i<height-5){
                   if(logicArray1[i][k]==="space"){
                       again=true;
                   }
                   else  if(logicArray1[i][k+1]==="space" || logicArray1[i][k-1]==="space"){
                       again=true;
                   }
                   else if(logicArray1[i-1][k]==="space" || logicArray1[i+1][k]==="space"){
                       again=true;
                   }
                }
       }
       }
       if(again===false){
           for(var i=randomHeightBeginning;i<randomHeightEnd;i++){
               for(var k=randomWidthBeginning;k<randomWidthEnd;k++){
                   logicArray1[i][k]="space";
               }
           }
           rooms++;
       }
    if(again===false){
        heightCenter=(randomHeightEnd+randomHeightBeginning)/2;
        widthCenter=(randomWidthEnd+randomWidthBeginning)/2;
        heightCenter=parseInt(heightCenter);
        widthCenter=parseInt(widthCenter);
        roomPosition.push(heightCenter);
        roomPosition.push(widthCenter);
    }
    }


    //Making tunnels
    for(var i=0;i<rooms*2-2;i+=2){
        var room1Height=roomPosition[i];
        var room1Width=roomPosition[i+1];
        var room2Height=roomPosition[i+2];
        var room2Width=roomPosition[i+3];
        while(room1Height!==room2Height ){
            if(room1Height<room2Height  ){
                room1Height++;
                logicArray1[room1Height][room1Width]="space";
            }
            else{
                room1Height--;
                logicArray1[room1Height][room1Width]="space";
            }
        }
        while(room1Width!==room2Width ){
            if(room1Width<room2Width){
                room1Width++;
                 logicArray1[room1Height][room1Width]="space";
            }
            else {
            room1Width--;
             logicArray1[room1Height][room1Width]="space";
            }
        }
    }
}
function addPlayer(){
    playerWasAdded=false;
    for(var i=0;i<height;i++){
        for(var k=0;k<width;k++){
            if(logicArray1[i][k]==="space"){
                var luck1=Math.random() < 0.998;
                if(luck1===false){
                    playerWasAdded=true;
                    logicArray1[i][k]="player";
                    playerX=k;
                    playerY=i;
                    return;
                }
            }
        }
    }
    if(playerWasAdded===false){
        addPlayer();
    }

}
function addClassToLogicArray(){
    helpIsActive=false;
    for (var i=playerY-5; i<playerY+5; i++){
        for ( var k = playerX-8 ; k<playerX+8; k ++) {
            $("#"+i+"S"+k).removeClass("player");
            $("#"+i+"S"+k).removeClass("space");
            $("#"+i+"S"+k).removeClass("hidden1");
            $("#"+i+"S"+k).removeClass("wall");
            $("#"+i+"S"+k).removeClass("monster");
            $("#"+i+"S"+k).removeClass("weapon");
            $("#"+i+"S"+k).removeClass("health");
            $("#"+i+"S"+k).removeClass("teleport");
            $("#"+i+"S"+k).removeClass("boss");


           if(k<playerX-6 || k>playerX+6 || i>playerY+5 || i<playerY-5 ){
             $("#"+i+"S"+k).addClass("hidden1");
           }
           else if(logicArray1[i][k]==="wall"){
                $("#"+i+"S"+k).addClass("wall");
            }
            else if(logicArray1[i][k]==="space"){
                $("#"+i+'S'+k).addClass("space");
            }
            else if(logicArray1[i][k]==="player"){
                $("#"+i+'S'+k).addClass("player");
                playerX=k;
                playerY=i;            
            }
            else if(logicArray1[i][k]==="monster"){
                $("#"+i+'S'+k).addClass("monster");
            }  
            else if(logicArray1[i][k]==="weapon"){
                $("#"+i+"S"+k).addClass("weapon");
            }
            else if(logicArray1[i][k]==="health"){
                 $("#"+i+"S"+k).addClass("health");
            }
            else if(logicArray1[i][k]==="teleport"){
                 $("#"+i+"S"+k).addClass("teleport");
            }
            else if(logicArray1[i][k]==="boss"){
                $("#"+i+"S"+k).addClass("boss");
            }
        }
    }
    $(".player").focus();
}
function showHelp(){
    console.log(boss);
    helpIsActive=true;
    for (var i=playerY-5; i<playerY+5; i++){
        for ( var k =0 ; k<100; k ++) {
            $("#"+i+"S"+k).removeClass("player");
            $("#"+i+"S"+k).removeClass("space");
            $("#"+i+"S"+k).removeClass("hidden1");
             $("#"+i+"S"+k).removeClass("wall");
            $("#"+i+"S"+k).removeClass("monster");
            $("#"+i+"S"+k).removeClass("weapon");
            $("#"+i+"S"+k).removeClass("health");
            $("#"+i+"S"+k).removeClass("teleport");
             $("#"+i+"S"+k).removeClass("boss");


             if(logicArray1[i][k]==="wall"){
                $("#"+i+"S"+k).addClass("wall");
            }
            else if(logicArray1[i][k]==="space"){
                $("#"+i+'S'+k).addClass("space");
            }
            else if(logicArray1[i][k]==="player"){
                $("#"+i+'S'+k).addClass("player");
                playerX=k;
                playerY=i;           
           }  
            else if(logicArray1[i][k]==="monster"){
                $("#"+i+'S'+k).addClass("monster");
            }  
            else if(logicArray1[i][k]==="weapon"){
                $("#"+i+"S"+k).addClass("weapon");
            }
            else if(logicArray1[i][k]==="health"){
                 $("#"+i+"S"+k).addClass("health");
            }
            else if(logicArray1[i][k]==="teleport"){
                 $("#"+i+"S"+k).addClass("teleport");
            }
            else if(logicArray1[i][k]==="boss"){
                 $("#"+i+"S"+k).addClass("boss");
            }
        }
    }
}
function hideHelp(){
    helpIsActive=false;
    for (var i=playerY-5; i<playerY+5; i++){
        for ( var k =0 ; k<100; k ++) {
            $("#"+i+"S"+k).removeClass("player");
            $("#"+i+"S"+k).removeClass("space");
            $("#"+i+"S"+k).removeClass("hidden1");
            $("#"+i+"S"+k).removeClass("wall");
            $("#"+i+"S"+k).removeClass("monster");
            $("#"+i+"S"+k).removeClass("weapon");
            $("#"+i+"S"+k).removeClass("health");
            $("#"+i+"S"+k).removeClass("teleport");
            $("#"+i+"S"+k).removeClass("boss");


             if(k<playerX-5 || k>playerX+5 || i>playerY+5 || i<playerY-5 ){
             $("#"+i+"S"+k).addClass("hidden1");
           }
             else if(logicArray1[i][k]==="wall"){
                $("#"+i+"S"+k).addClass("wall");
            }
            else if(logicArray1[i][k]==="space"){
                $("#"+i+'S'+k).addClass("space");
            }
            else if(logicArray1[i][k]==="player"){
                $("#"+i+'S'+k).addClass("player");
                playerX=k;
                playerY=i;           
           }  
            else if(logicArray1[i][k]==="monster"){
                $("#"+i+'S'+k).addClass("monster");
            }  
            else if(logicArray1[i][k]==="weapon"){
                $("#"+i+"S"+k).addClass("weapon");
            }
            else if(logicArray1[i][k]==="health"){
                 $("#"+i+"S"+k).addClass("health");
            }
            else if(logicArray1[i][k]==="teleport"){
                 $("#"+i+"S"+k).addClass("teleport");
            }
            else if(logicArray1[i][k]==="boss"){
                $("#"+i+"S"+k).addClass("boss");
            }

        }
    }
   
}

function addMonsters(){
    for(var i=0;i<height;i++){
        for(var k=0; k<width;k++){
            if(logicArray1[i][k]==="space"){
            luck=Math.random()<0.998;
              if(luck===false){
                logicArray1[i][k]="monster";
                var HealthJustQuick=Math.random()*(50*dungeon-20*dungeon)+20*dungeon;
                HealthJustQuick=parseInt(HealthJustQuick);
                var propertyName1="monster"+i+k;
                console.log(monstersHealth);
                monstersHealth[propertyName1]=HealthJustQuick;
                monsters++; 
                if(monsters===10){
                    return;
                }      
              }
           }
        }
    }
    if(monsters>1){
      addMonsters();
    }
}
function addWeapon(){
    for(var i=0;i<height;i++){
        for(var k=0;k<width;k++){
            luck=Math.random()<0.98;
            if(luck===false){

            if(logicArray1[i][k]==="space"){
                logicArray1[i][k]="weapon";
                weaponAdded=true;
                return;
                
            }
        }
        }
    }
    if(weaponAdded===false){
        addWeapon();
    }
}
function addHealth(){
    for(var i=0; i<height;i++){
        for(var k=0; k<width;k++){
            luck=Math.random()<0.99;
            if(luck===false){
            if(logicArray1[i][k]==="space"){
                logicArray1[i][k]="health";
                numOfHealth++;
                if(numOfHealth>5){
                    return;
                }
            }

        }
        }
    }
    if(numOfHealth<5){
        addHealth();
    }
}
function addTeleport(){
    for(var i=0;i<height;i++){
        for(var k=0;k<width;k++){
            if(logicArray1[i][k]==="space"){
            var luckyTeleport=Math.random()<0.999;
            if(luckyTeleport==false){
                logicArray1[i][k]="teleport";
                teleportWasAdded=true;
                console.log("teleportWasAdded");
                return;
            }
    }
}
}
    if(teleportWasAdded===false){
        addTeleport();
    }
}

function fight(y,x){
     damageFromPlayer=Math.random()*((playerAttack+5)-(playerAttack-5))+playerAttack-5;
     damageFromPlayer=parseInt(damageFromPlayer);
     monstersHealth["monster"+y+x]-=damageFromPlayer;
     if(monstersHealth["monster"+y+x]<0)
     {  
        nextLevelXP-=dungeon*10;
        document.getElementById("playerNextLevel").innerHTML="Next Level"+nextLevelXP+"XP";
        if(nextLevelXP<=0){
            nextLevelXP=(dungeon*7)*10;
            playerAttack+=dungeon*7;
            playerLevel++;
            document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
            document.getElementById("playerLevel").innerHTML="Level:"+playerLevel;
            document.getElementById("playerNextLevel").innerHTML="Next Level "+nextLevelXP+"XP";
        }
        logicArray1[y][x]==="space";
        return true;
     }
     else {
     damageFromMonster=Math.random(10*dungeon-4*dungeon)+4*dungeon;
     damageFromMonster=parseInt(damageFromMonster);
     playerHealth=playerHealth-damageFromMonster;
     document.getElementById("playerHealth").innerHTML="Health"+playerHealth;
     if(playerHealth<0){
        alert("game over");
        replay1=true;
     }
     }
     return false;
}

function levelUp(){
    rooms=0;
    monsters=0;
    logicArray1Child=[];
    roomPosition=[];
    logicArray1=[];
    monstersHealth={};
    teleportWasAdded=false;
    weaponAdded=false;
    playerX=0;
    playerY=0;
    removeEveryClass();
    setUpLogicArray();
    makeRooms();
    addPlayer();
    addMonsters();
    addWeapon();
    addHealth();
    dungeon++;
    if(dungeon<4){
    addTeleport();
    }
    document.getElementById("dungeon").innerHTML="Dungeon: "+dungeon;
}
function removeEveryClass(){
     for(var i=0;i<height;i++){
         for(var k=0;k<width;k++){
            $("#"+i+"S"+k).removeClass("player");
            $("#"+i+"S"+k).removeClass("space");
            $("#"+i+"S"+k).removeClass("hidden1");
            $("#"+i+"S"+k).removeClass("wall");
            $("#"+i+"S"+k).removeClass("monster");
            $("#"+i+"S"+k).removeClass("weapon");
            $("#"+i+"S"+k).removeClass("health");
            $("#"+i+"S"+k).removeClass("teleport"); 
             $("#"+i+"S"+k).removeClass("boss");
            $("#"+i+"S"+k).addClass("hidden1"); 
           

         }
     }
}
function addBoos(){
    for(var i=0;i<height;i++){
        for(var k=0;k<width;k++){
            if(logicArray1[i][k]==="space" && logicArray1[i][k+1]==="space" && logicArray1[i+1][k]==="space" && logicArray1[i+1][k+1]==="space"){
                var luckyBoss=Math.random()<0.9;
                if(luckyBoss===false){
                     logicArray1[i][k]="boss";
                     logicArray1[i][k+1]="boss";
                     logicArray1[i+1][k]="boss";
                     logicArray1[i+1][k+1]="boss";
                     var luckyBoss1=Math.random()*(200-30)+30;
                     luckyBoss1=parseInt(luckyBoss1);
                     boss["boss"+i+k]=luckyBoss1;
                     luckyBoss1=Math.random()*(200-30)+30;
                     luckyBoss1=parseInt(luckyBoss1);
                     boss["boss"+(i+1)+k]=luckyBoss1;
                     luckyBoss1=Math.random()*(200-30)+30;
                     luckyBoss1=parseInt(luckyBoss1);
                     boss["boss"+i+(k+1)]=luckyBoss1;
                     luckyBoss1=Math.random()*(200-30)+30;
                     luckyBoss1=parseInt(luckyBoss1);
                     boss["boss"+(i+1)+(k+1)]=luckyBoss1;
                     console.log("boss added");
                     bosWasAdded=true;
                     console.log(boss);
                     return;
                }
            }
        }
    }
    if(bossWasAdded===false){
        addBoos();
    }
}
function killingTheBoss(y,x){
     damageFromPlayer=Math.random()*((playerAttack+2*dungeon)-(playerAttack-4*dungeon))+playerAttack-4;
     damageFromPlayer=parseInt(damageFromPlayer);
     console.log(boss);
     boss["boss"+y+x]-=damageFromPlayer;
     console.log(boss);
     if(boss["boss"+y+x]<0){
         
           delete boss["boss"+y+x];
           if(jQuery.isEmptyObject(boss)==true){
             alert("You Won The game Congrat");
              replay1=true;
           }
           $(".boss"+y+x).removeClass("boss");
           nextLevelXP-=dungeon*10;
        document.getElementById("playerNextLevel").innerHTML="Next Level"+nextLevelXP+"XP";
        if(nextLevelXP<=0){
            nextLevelXP=(dungeon*7)*10;
            playerAttack+=dungeon*7;
            playerLevel++;
            document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
            document.getElementById("playerLevel").innerHTML="Level:"+playerLevel;
            document.getElementById("playerNextLevel").innerHTML="Next Level "+nextLevelXP+"XP";
     }
      logicArray1[y][x]==="space";
        return true;
         
     }
     else {
      damageFromBoss=Math.random(40-20)+20;
     damageFromBoss=parseInt(damageFromBoss);
     playerHealth=playerHealth-damageFromBoss;
    document.getElementById("playerHealth").innerHTML="Health"+playerHealth;
     if(playerHealth<0){
        alert("game over");
        replay1=true;
     }
     return false;

     }


}

function replay(){
 logicArray1=[];
 logicArray1Child=[];
 roomPosition=[];
 width=100;
 height=100;
 playerX=0;
 playerY=0;
 rooms=0;
 monsters=0;
 helpIsActive=false;
 weaponAdded=false;
 numOfHealth=0;
 bosWasAdded=false;
 playerHealth=100;
 playerAttack=5;
 playerLevel=1;
 weapon="stick";
 nextLevelXP=60;
 dungeon=1;
 monstersHealth={};
 teleportWasAdded=false;
 boss={};
 bossWasAddedInRender=false;
 document.getElementById("playerHealth").innerHTML="Health: "+playerHealth;
 document.getElementById("playerLevel").innerHTML="Level: "+playerLevel;
 document.getElementById("weapon").innerHTML="Weapon: "+weapon;
 document.getElementById("playerAttack").innerHTML="Attack "+playerAttack;
 document.getElementById("dungeon").innerHTML="Dungeon "+dungeon;
 document.getElementById("playerNextLevel").innerHTML="Next Level: "+nextLevelXP+"XP";

 removeEveryClass();
    setUpLogicArray();
    makeRooms();
    addPlayer();
    addMonsters();
    addWeapon();
    addHealth();
    addTeleport();

}
