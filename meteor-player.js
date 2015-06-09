if (Meteor.isClient) {
  Template.hello.events({
    'durationchange #audio': function(e, template) {
      var audio;
      audio = template.find('#audio');
      Session.set('duration', audio.duration);
    },

    'play #audio': function(e, template) {
      interval = setInterval(function() {
        var audio;
        audio = template.find('#audio');
        Session.set('currentTime', audio.currentTime);
      }, 25); // this is faster then timeupdate but more costly for CPU
    },

    'ended #audio': function() {
      return clearInterval(interval);
    },

    'timeupdate #audio': function(e, template) {},
    'click .play': function(e, template) {
      template.find('#audio').play();
    },

    'click .pause': function (e, template) {
      template.find('#audio').pause();
    },

    'click .line': function (e, template) {
      var x = e.offsetX;
      width = e.currentTarget.offsetWidth;
      newTime = (x / width) * Session.get('duration');
      audio.currentTime = newTime;
    }
  });

  Template.hello.helpers({
    cursorAttributes: function() {
      var currentTime, duration;
      currentTime = Session.get('currentTime') || 1;
      duration = Session.get('duration') || 1;
      return {
        x: "" + (currentTime * 100 / duration) + "%",
        y: 0,
        width: 2,
        height: "100%",
        "class": "cursor"
      };
    }
  });
}