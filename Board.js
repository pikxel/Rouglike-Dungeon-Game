var React = require('react');
var ReactDOM = require('react-dom');
var array1=[];
var array2=[];
var hundred=[];
var hundred1=[];
var Board = React.createClass({
getInitialState: function () {
    return({toRender:0});
},
componentWillUpdate: function (){
  if(dungeon===4){
      if(bossWasAddedInRender===false){
      addBoos();
      bossWasAddedInRender=true;
      }
  }
},
componentWillMount: function (){
    setUpLogicArray();
    makeRooms();
    addPlayer();
    addMonsters();
    addWeapon();
    addHealth();
    addTeleport();
    
    this.setUpField();
    this.setUpFieldToRender();
},
componentDidMount: function (){
   addClassToLogicArray(); // We need to add class to divs after it is rendered, beucase If we put it into componentWillMount the divs to which we attach the classes do no exits yet
  
},
componentDidUpdate: function (){
   addClassToLogicArray();
   if(replay1===true){
      replay1=false;
      replay();
      this.setUpField();
      this.setUpFieldToRender();
  }

},
setUpField: function () {
        array1=[];
        array2=[];
        for(var i=0;i<height;i++){
            for(var k=0;k<width;k++){
                array2.push(<input id={i+"S"+k}  onKeyDown={this.handleKeyPress} className=" hidden1 col-sm-1Customized"></input>);
                }
                array1.push(array2);
                array2=[];
         }
},
setUpFieldToRender: function () {
    this.setState({toRender:"SSS"});
    var toRenderArray=[];
    for(var i=playerY-5;i<playerY+5;i++){
        toRenderArray.push(array1[i]);
    }
      
      this.setState({toRender:toRenderArray});
},
handleKeyPress: function (e) {
    if(helpIsActive===false){
switch (e.keyCode) {
        case 37: {
               
               if(logicArray1[playerY][playerX-1]==="space"){
                   logicArray1[playerY][playerX-1]='player';
                   logicArray1[playerY][playerX]='space';
                   playerX=playerX-1;               
                   addClassToLogicArray();
               }
               else if(logicArray1[playerY][playerX-1]==="monster"){
                   var d=fight(playerY,playerX-1);
                   if(d===true){
                        logicArray1[playerY][playerX-1]='player';
                   logicArray1[playerY][playerX]='space';
                   playerX=playerX-1;               
                   addClassToLogicArray();
                   }
               }  
               else if(logicArray1[playerY][playerX-1]==="health"){ 
                 var luckyHealth=Math.random()*(20-10)+10;
                 luckyHealth=parseInt(luckyHealth);
                 playerHealth=playerHealth+luckyHealth;
                 document.getElementById("playerHealth").innerHTML="Health"+playerHealth;
                  logicArray1[playerY][playerX-1]='player';
                   logicArray1[playerY][playerX]='space';
                   playerX=playerX-1;               
                   addClassToLogicArray();
               }     
               else if(logicArray1[playerY][playerX-1]==="weapon"){
                 switch(weapon){
                     case "stick":{
                         playerAttack+=7;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: mace";
                         break;
                     }
                     case "mace":{
                         playerAttack+=5;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sledge";
                         break;
                     }
                      case "sledge":{
                         playerAttack+=5;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sword";
                         break;
                     }
                      case "sword":{
                         playerAttack+=5;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon:sword+armor";
                         break;
                     }

                 }
                 
                   logicArray1[playerY][playerX-1]='player';
                   logicArray1[playerY][playerX]='space';
                   playerX=playerX-1;               
                   addClassToLogicArray();
               }
               else if(logicArray1[playerY][playerX-1]==="teleport"){
                    removeEveryClass();
                    rooms=0;
                    monsters=0;
                    logicArray1=[];
                    monstersHealth={};
                    teleportWasAdded=false;
                    weaponAdded=false;
                    playerX=0;
                    playerY=0;
                    dungeon++;
                    document.getElementById("dungeon").innerHTML="Dungeon: "+dungeon;
                    this.componentWillMount();
               }
               else if(logicArray1[playerY][playerX-1]==="boss"){
                   var u=killingTheBoss(playerY,playerX-1);
                   if(u===true){
                   logicArray1[playerY][playerX-1]='player';
                   logicArray1[playerY][playerX]='space';
                   playerX=playerX-1;               
                   addClassToLogicArray();
                   this.setUpFieldToRender();
                   }
               }
                   
               break;
            }
        case 38:{
              
               if(logicArray1[playerY-1][playerX]==="space"){
                   logicArray1[playerY-1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY-1;
                   this.setUpFieldToRender();
               }       
               else if(logicArray1[playerY-1][playerX]==="monster"){
                   var d=fight(playerY-1,playerX);
                   if(d===true){
                        logicArray1[playerY-1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY-1;
                   this.setUpFieldToRender();
                   }
               }
               else if(logicArray1[playerY-1][playerX]==="health"){ 
                 var luckyHealth=Math.random()*(20*dungeon-10*dungeon)+10*dungeon;
                 luckyHealth=parseInt(luckyHealth);
                 playerHealth=playerHealth+luckyHealth;
                 document.getElementById("playerHealth").innerHTML="Health"+playerHealth;
                 logicArray1[playerY-1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY-1;
                   this.setUpFieldToRender();
               }
               else if(logicArray1[playerY-1][playerX]==="weapon"){
                    switch(weapon){
                     case "stick":{
                         playerAttack+=7;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: mace";
                         break;
                     }
                     case "mace":{
                         playerAttack+=10;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sledge";
                         break;
                     }
                      case "sledge":{
                         playerAttack+=12;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sword";
                         break;
                     }
                      case "sword":{
                         playerAttack+=20;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon:sword+armor";
                         break;
                     }

                 }
                   logicArray1[playerY-1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY-1;
                   this.setUpFieldToRender();
               } 
               else if(logicArray1[playerY-1][playerX]==="teleport"){
                    levelUp();
                    this.setUpField();
                    addClassToLogicArray();
                    this.setUpFieldToRender();
               }
               else if(logicArray1[playerY-1][playerX]==="boss"){
                   var u=killingTheBoss(playerY-1,playerX);
                   if(u===true){
                        logicArray1[playerY-1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY-1;
                   addClassToLogicArray();
                   this.setUpFieldToRender();
                   
                   }
               }
            break;
        }
        case 39:{
               if(logicArray1[playerY][playerX+1]==="space"){
                   logicArray1[playerY][playerX+1]="player";;
                   logicArray1[playerY][playerX]="space";  
                   playerX=playerX+1;
                  addClassToLogicArray();
               }
               else if(logicArray1[playerY][playerX+1]==="monster"){
                   var d=fight(playerY,playerX+1);
                   if(d===true){
                       logicArray1[playerY][playerX+1]="player";;
                   logicArray1[playerY][playerX]="space";  
                   playerX=playerX+1;
                  addClassToLogicArray();
                       
                   }
               } 
                else if(logicArray1[playerY][playerX+1]==="health"){ 
                 var luckyHealth=Math.random()*(20*dungeon-10*dungeon)+10*dungeon;
                 luckyHealth=parseInt(luckyHealth);
                 playerHealth=playerHealth+luckyHealth;
                 document.getElementById("playerHealth").innerHTML="Health"+playerHealth;
                   logicArray1[playerY][playerX+1]="player";;
                   logicArray1[playerY][playerX]="space";  
                   playerX=playerX+1;
                  addClassToLogicArray();
               }
               else if(logicArray1[playerY][playerX+1]==="weapon"){
                   switch(weapon){
                     case "stick":{
                         playerAttack+=7;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: mace";
                         break;
                     }
                     case "mace":{
                         playerAttack+=10;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sledge";
                         break;
                     }
                      case "sledge":{
                         playerAttack+=12;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sword";
                         break;
                     }
                      case "sword":{
                         playerAttack+=20;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon:sword+armor";
                         break;
                     }

                 }
                 
              logicArray1[playerY][playerX+1]="player";;
                   logicArray1[playerY][playerX]="space";  
                   playerX=playerX+1;
                  addClassToLogicArray();
               }
               else if(logicArray1[playerY][playerX+1]==="teleport"){
                    levelUp();
                    this.setUpField();
                    this.setUpFieldToRender();
               }
               else if(logicArray1[playerY][playerX+1]==="boss"){
                  var u=killingTheBoss(playerY,playerX+1);
                  if(u===true){
                    logicArray1[playerY][playerX+1]="player";;
                   logicArray1[playerY][playerX]="space";  
                   playerX=playerX+1;
                  addClassToLogicArray();
                   this.setUpFieldToRender();
                  }
               }
            break;
        }
        case 40:{

               if(logicArray1[playerY+1][playerX]==="space"){
                   logicArray1[playerY+1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY+1;
                     this.setUpFieldToRender();
               }
               else if(logicArray1[playerY+1][playerX]==="monster"){
                   var d=fight(playerY+1,playerX);
                   if(d===true){
                         logicArray1[playerY+1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY+1;
                     this.setUpFieldToRender();
                   }
               }
                else if(logicArray1[playerY+1][playerX]==="health"){ 
                 var luckyHealth=Math.random()*(20*dungeon-10*dungeon)+10*dungeon;
                 luckyHealth=parseInt(luckyHealth);
                 playerHealth=playerHealth+luckyHealth;
                 document.getElementById("playerHealth").innerHTML="Health"+playerHealth;
                  logicArray1[playerY+1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY+1;
                     this.setUpFieldToRender();
               } 
               else if(logicArray1[playerY+1][playerX]==="weapon"){
                   switch(weapon){
                     case "stick":{
                         playerAttack+=7;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: mace";
                         break;
                     }
                     case "mace":{
                         playerAttack+=10;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sledge";
                         break;
                     }
                      case "sledge":{
                         playerAttack+=12;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon: sword";
                         break;
                     }
                      case "sword":{
                         playerAttack+=20;
                         document.getElementById("playerAttack").innerHTML="Attack:"+playerAttack;
                         document.getElementById("weapon").innerHTML="Weapon:sword+armor";
                         break;
                     }

                 }
                 
                  logicArray1[playerY+1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY+1;
                     this.setUpFieldToRender();
               }
               else if(logicArray1[playerY+1][playerX]==="teleport"){
                   levelUp();
                    this.setUpField();
                    this.setUpFieldToRender();
               }
               else if(logicArray1[playerY+1][playerX]==="boss"){
                  var u= killingTheBoss(playerY+1,playerX);
                  if(u===true){
                   logicArray1[playerY+1][playerX]="player";
                   logicArray1[playerY][playerX]="space";
                   playerY=playerY+1;
                    addClassToLogicArray();
                     this.setUpFieldToRender();
                  }
               }
               break;             
               }        
};

}},
showMap: function () {
    var l=document.getElementsByClassName("player")[0].id;
    
    if(helpIsActive===false){
    showHelp();
    
    }
    else{
    hideHelp();
    setTimeout(function(){
    document.getElementById(l).focus();
    $( "#"+l ).focus();
    $(".player").focus();
    },100);
    }
},
       render: function () {
       
        return (
            <div>
            <div className="text-right">
            <button type="button" onMouseDown={this.showMap}>Help</button>
           
            </div>
            <br />
            <br/>
            <br />
            <br/>
            <div className="row">
               <div className="col-sm-12">
                {this.state.toRender}
               </div>
            </div>
            <br /> <br />
            </div>

        )
    }
});

module.exports=Board;
