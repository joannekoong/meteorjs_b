// create collection named "players" inside db
PlayersList = new Mongo.Collection("players");


if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      return "Some other text"
    }, 
    'otherHelperFunction': function() {
      return "some other function!!!"
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