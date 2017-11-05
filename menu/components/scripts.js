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

var hmd = true;

console.log($("#links").classList);
$( window ).resize(function() {
  if ($(window).width() <= 500) {
    $("#links").attr("visible", "false");
    hmd = false;
  } else {

  }
});

/*
var menu_mobile = {
  visible: true,
}

function modifyMenuMobile(menu) {
  console.log(menu.visible);
}

animateUp(menu_mobile);
*/

var menuDown = true;
console.log(menuDown);

function showMenu(camRotation) {
  var sphere = document.querySelector("#sphere");
  var skyOverlay = document.querySelector('#sky-overlay');
  var linkContainer = document.querySelector('#link-container');
  // linkContainer.setAttribute('rotation', { x: 0, y: camRotation, z: 0 });
  if (menuDown) {
    document.querySelector("#menu-container").className += " visible"; //Change to VR menu
    skyOverlay.emit('fade'); //Change to VR menu
    //skyOverlay.setAttribute('material', 'opacity', '.6');
    linkContainer.setAttribute('rotation', { x: 0, y: camRotation, z: 0 });
    menuDown = false;
    if (hmd) {
        $("#link-container").attr("visible", "true");
    }

  }
}

function hideMenu() {
  var sphere = document.querySelector("#sphere");
  var skyOverlay = document.querySelector('#sky-overlay');
  if (!menuDown) {
    $(document.querySelector("#menu-container")).removeClass("visible");
    skyOverlay.emit('hide');
    menuDown = true;
    $("#link-container").attr("visible", "false");
  }
}


AFRAME.registerComponent('camerarotation', {
  schema: {type: 'string'},
  init: function () {
    var eventName = this.data;
    this.el.addEventListener('componentchanged', function (evt) {
      var camRotation = evt.detail.newData.y
      if (evt.detail.name !== 'rotation') {return;};
      if (evt.detail.newData.x < -30) {
        if ($(window).width() >= 500) {
          showMenu(camRotation);
        }
      } else {
        hideMenu();
      }
    });
  },
});
