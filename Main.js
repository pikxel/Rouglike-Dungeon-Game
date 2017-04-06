var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');

  var Main = React.createClass({
    render: function(){
      return(
        <div>
        <div className="row text-center">
          
          <h3>Roguelike Dungeon 1.0</h3>
          
        </div>

          <div className="row">
             <div className="col-sm-2">
                  <h4 id="playerHealth">Health: 100</h4>
             </div>
             <div className="col-sm-2">
                 <h4 id="playerLevel">Level: 1</h4>
             </div>
             <div className="col-sm-2">
                <h4 id="weapon">Weapon:Stick</h4>
             </div>
             <div className="col-sm-2">
                 <h4 id="playerAttack">Attack:5</h4>
             </div>
             <div className="col-sm-2">
                 <h4 id="dungeon">Dungeon:1</h4>
             </div>
             <div className="col-sm-2">
                 <h4 id="playerNextLevel">Next Level:60XP</h4>
             </div>
          </div>
          <div>
          <Board />
        </div>
        </div>
      )
    }
  });

  ReactDOM.render(<Main />, document.getElementById('app'))
