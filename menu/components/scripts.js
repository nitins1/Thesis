$( document ).ready(function() {

  $("#menu-button").click(function() {
    if (menuDown == true) {
      document.querySelector("#menu-container").className += " visible";
      menuDown = false;
    } else {
      $(document.querySelector("#menu-container")).removeClass("visible");
      menuDown = true;
    }
  });

  //check browser width, set #links visibility property to false when less than {x} pixels
  console.log($(window).width())




});

var hmd = true

console.log($("#links").classList);
$( window ).resize(function() {
  if ($(window).width() <= 500) {
    $("#links").attr("visible", "false");
    hmd = false;
  } else {

  }
});

var menuDown = true;
console.log(menuDown);
var sphere = document.querySelector("#sphere");

function showMenu() {
  //console.log('showMenu');
  console.log(menuDown);
  var sphere = document.querySelector("#sphere");
  if (menuDown) {
    document.querySelector("#menu-container").className += " visible"; //Change to VR menu
    sphere.emit('fade'); //Change to VR menu
    menuDown = false;
    if (hmd) {
        $("#links").attr("visible", "true");
    }

  }
}

function hideMenu() {
  var sphere = document.querySelector("#sphere");
  if (!menuDown) {
    $(document.querySelector("#menu-container")).removeClass("visible");
    sphere.emit('hide');
    menuDown = true;
    $("#links").attr("visible", "false");
  }
}
AFRAME.registerComponent('camerarotation', {
  schema: {type: 'string'},
  init: function () {
    console.log("printing this: " + this.data);
    var eventName = this.data;
    this.el.addEventListener('componentchanged', function (evt) {
      //console.log(evt.detail.newData.x);
      if (evt.detail.name !== 'rotation') { return; }
      if (evt.detail.newData.x < -20) {
        //this.emit(eventName);
        //console.log("eventName: " + eventName);
        showMenu();
      } else {
        hideMenu();
      }
      /*
      while (evt.detail.newData.x > -20) {
        showMenu();
      } */
    });
  }
});
