// create collection named "players" inside db
PlayersList = new Mongo.Collection("players");


if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      return PlayersList.find() 
    }, 
    'selectedClass': function() {
      var playerId = this._id; 
      var selectedPlayer = Session.get('selectedPlayer'); 
      if(playerId == selectedPlayer) { 
        return "selected"
      }
    }
  });

  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id; 
      Session.set('selectedPlayer', playerId);
    }, 
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer'); 
      PlayersList.update(selectedPlayer, {$inc: {score: 5} }); 
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
