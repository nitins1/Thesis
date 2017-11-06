$( document ).ready(function() {

  // Whether or not the user is using an head mounted device
  var hmd = true;

  // Whether or not the menu is hidden or visible. Menu is down by default.
  var menuDown = true;

  var lookingDown = false;

  var carSound = new Howl({
    src: ['audio/car.mp3'],
    autoplay: true,
    loop: true,
    volume: 1,
    onend: function() {
      console.log('Finished!');
    }
  });

  console.log(carSound._src);

  var farmSound = new Howl({
    src: ['audio/farm.mp3'],
    autoplay: false,
    loop: true,
    volume: 1,
    onend: function() {
      console.log('Finished!');
    }
  });

  var citySound = new Howl({
    src: ['audio/city.mp3'],
    autoplay: false,
    loop: true,
    volume: 1,
    onend: function() {
      console.log('Finished!');
    }
  });

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

  function fadeSoundDown() {
    if (lookingDown) {
      return;
    } else {
      carSound.fade(1, .3, 600);
    }
  };

  function fadeSoundUp() {
    if (!lookingDown) {
      return;
    } else {
      carSound.fade(.3, 1, 600);
    }
  };

  // Show menu
  function showMenu(camRotation) {
    //var sphere = document.querySelector("#sphere"); // Grab element from the DOM

    var skyOverlay = document.querySelector('#sky-overlay'); // Grab Sky Overlay
    var vrMenu = document.querySelector('#vr-menu-container'); // Grab menu container
    // linkContainer.setAttribute('rotation', { x: 0, y: camRotation, z: 0 }); // Moves the entire menu as the user rotates

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

  AFRAME.registerComponent('swapsound', {
    schema: {type: 'string', default: "audio/farm.mp3"},
    init: function () {
      var data = this.data;
      var el = this.el;
      var soundToPlay = el.getAttribute('soundtoplay');
      el.addEventListener('click', function () {
        carSound.stop();
        carSound._src = soundToPlay;
        carSound._volume = .3
        console.log(carSound._src);
        carSound.play();
        console.log(carSound._volume);
      });
    }
  });

  lookingAtMenuItem = false;

  AFRAME.registerComponent('changetext', {
    schema: {
      newtext: {default: 'text'}
    },
    init: function () {
      var data = this.data;
      var el = this.el;
      var desc = document.querySelector("#desc");
      el.addEventListener('mouseenter', function () {

        lookingAtMenuItem = true;
        console.log("is looking at menu item " + lookingAtMenuItem)
        var newText = data.newtext;
        //console.log(desc.getAttribute('text').value);
        desc.setAttribute('text', 'value', newText);
      });
      el.addEventListener('mouseleave', function () {
        var delay = 1000;
        lookingAtMenuItem = false;
        console.log("is looking at menu item " + lookingAtMenuItem)
        setTimeout(function() {
          if (lookingAtMenuItem == true) {
            return;
          } else if (!lookingAtMenuItem) {
            desc.setAttribute('text', 'value', "This is a description of the video that you’ve currently hovered over. Click to view that scene!");
            lookingAtMenuItem = false;
          };
          //console.log("is looking at menu item " + lookingAtMenuItem)

          console.log("is looking at menu item " + lookingAtMenuItem)
        }, delay);

        setTimeout(function() {
          if (!lookingAtMenuItem) { desc.setAttribute('text', 'value', "This is a description of the video that you’ve currently hovered over. Click to view that scene!"); };
        }, (delay+400));
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
          fadeSoundDown();
          lookingDown = true;
          showMenu(camRotation);
        } else {
          hideMenu();
          fadeSoundUp();
          lookingDown = false;
        }
      });
    },
  });

});
