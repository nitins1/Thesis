$( document ).ready(function() {

  // Whether or not the user is using an head mounted device
  var hmd = true;

  // Whether or not the menu is hidden or visible. Menu is down by default.
  var menuDown = true;

  var lookingDown = false;

  // When the menu button is clicked, show the 2D menu if it's down, hide it if it's up
  $("#menu-button").click(function() {
    if (menuDown == true) {
      document.querySelector("#menu-container").className += " visible";
      menuDown = false;
    } else {
      $(document.querySelector("#menu-container")).removeClass("visible");
      menuDown = true;
    }
  });

  // 2D menu is being shown/hidden through media queries

  // If the window width is less than 500px, hide the link-container and set hmd to false
  $( window ).resize(function() {
    if ($(window).width() <= 500) {
      $("#link-container").attr("visible", "false");
      hmd = false;
    } else {
    }
  });

  // Show menu
  function showMenu(camRotation) {
    //var sphere = document.querySelector("#sphere"); // Grab element from the DOM

    var skyOverlay = document.querySelector('#sky-overlay'); // Grab Sky Overlay
    var vrMenu = document.querySelector('#vr-menu-container'); // Grab menu container
    //vrMenu.setAttribute('rotation', { x: 0, y: camRotation, z: 0 }); // Moves the entire menu as the user rotates

    // If the menu is down
    if (menuDown) {
      skyOverlay.emit('darken'); // Darken the sky
      vrMenu.setAttribute('rotation', { x: 0, y: camRotation, z: 0 }); // position the VR menu right in fron of the user based on their rotation
      vrMenu.setAttribute('visible', 'true'); // Set the VR menu to visible
      menuDown = false; // The menu is now up
    }
  }

  // Hide menu
  function hideMenu() {

    var skyOverlay = document.querySelector('#sky-overlay'); // Grab Sky Overlay
    var vrMenu = document.querySelector('#vr-menu-container'); // Grab menu container
    // If the menu is up
    if (!menuDown) {
      skyOverlay.emit('brighten'); // Brighten the sky
      vrMenu.setAttribute('visible', 'false'); // Set the VR menu to visible
      menuDown = true;
    }
  }

  lookingAtMenuItem = false;

  AFRAME.registerComponent('cursor-listener', {
    init: function () {
      this.el.addEventListener('click', function (evt) {
        this.setAttribute('material', 'color', '#000');
        console.log('I was clicked at: ', evt.detail.intersection.point);
      });
    }
  });

  // Component that listens to the camera's rotation
  AFRAME.registerComponent('camerarotation', {
    schema: {type: 'string'},
    init: function () {
      var eventName = this.data;
      this.el.addEventListener('componentchanged', function (evt) {
        console.log(evt.detail.name);
        var camRotation = evt.detail.newData.y
        if (evt.detail.name !== 'rotation') {return;};
        if (evt.detail.newData.x < -20) {
          lookingDown = true;
          showMenu(camRotation);
        } else {
          hideMenu();
          lookingDown = false;
        }
      });
    },
  });

});
