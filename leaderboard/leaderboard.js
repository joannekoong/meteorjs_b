// create collection named "players" inside db
PlayersList = new Mongo.Collection("players");

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId; 
    return PlayersList.find({createdBy: currentUserId})
  }); 

  Meteor.methods({
    'insertPlayerData': function(playerNameVar) {
      var currentUserId = Meteor.userId(); 
      PlayersList.insert({
        name: playerNameVar, 
        score: 0,
        createdBy: currentUserId
      })
    }, 

    'removePlayerData': function(selectedPlayer) {
      var currentUserId = Meteor.userId(); 
      PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId}); 
    }, 
    'modifyPlayerScore': function(selectedPlayer, scoreValue) {
      var currentUserId = Meteor.userId(); 
      PlayersList.update({_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score: scoreValue}}); 

    }


  }); 
}

if (Meteor.isClient) {
  Meteor.subscribe('thePlayers'); 
  Template.leaderboard.helpers({
    'player': function() {
      var currentUserId = Meteor.userId(); 
      return PlayersList.find({}, {sort: {score: -1, name: 1} }) 
    }, 
    'selectedClass': function() {
      var playerId = this._id; 
      var selectedPlayer = Session.get('selectedPlayer'); 
      if(playerId == selectedPlayer) { 
        return "selected"
      }
    }, 
    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer'); 
      return PlayersList.findOne(selectedPlayer) 
    }
  });

  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id; 
      Session.set('selectedPlayer', playerId);
    }, 
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer'); 
      Meteor.call('modifyPlayerScore', selectedPlayer, 5); 
    }, 
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer'); 
      Meteor.call('modifyPlayerScore', selectedPlayer, -5); 
    }, 
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer'); 
      Meteor.call('removePlayerData', selectedPlayer); 
    }
  });  

  Template.addPlayerForm.events({
    'submit form': function(){
      event.preventDefault(); 
      var playerNameVar = event.target.playerName.value;
      Meteor.call('insertPlayerData', playerNameVar); 
      
      event.target.playerName.value = '';  

      
    }
  }); 

}



// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);

//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });

//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
