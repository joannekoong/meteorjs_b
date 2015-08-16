if (Meteor.isClient) {

  Template.body.helpers({
    tasks: [
      { text: "this is task 1" }, 
      { text: "this is task 2" }, 
      { text: "this is task 3" }
    ]
  });
}
