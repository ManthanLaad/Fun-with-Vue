body {
  margin: 0;
  cursor: pointer;
  background: #111; /* Dark background color */
}

canvas {
  display: block;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

footer {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 200px; /* Set the desired width for the footer */
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 20px; /* Increase padding to make it bigger */
  user-select: none;
}

footer p {
  margin: 0;
  font-size: 14px;
}
.fab.fa-github {
  background-color: white;
  border-radius: 50%; /* Optionally add border-radius for a circular background */
}

footer::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(
    0,
    0,
    0,
    0.2
  ); /* Overlay background color with transparency */
  pointer-events: none; /* Allow clicks to pass through the overlay to the content below */
}

#fullscreenButton {
  position: absolute;
  top: 20px;
  right: 20px; /* Adjust the position as needed */
  cursor: pointer;
  color: white;
  z-index: 9999; /* Ensure it's on top */
  font-size: 24px;
}

/* Additional styles for mobile view */
@media screen and (max-width: 768px) {
  footer {
    position: fixed; /* Fixed position to keep it at the bottom */
    width: 100%; /* Extend horizontally to full width */
    text-align: center; /* Center text */
    z-index: 1000; /* Ensure it's on top of other content */
    background: rgba(0, 0, 0, 0.7); /* Darken the background */
    padding: 10px; /* Reduce padding for mobile view */
  }
  #fullscreenButton {
    font-size: 18px;
    top: 15px;
    right: 10px;
  }

  /* Adjust font size for mobile view */
  footer p {
    font-size: 12px;
  }

  html,
  body {
    max-height: 100%;
    overflow: hidden;
  }

  /* Check if the device is in landscape mode */
  @media screen and (orientation: landscape) {
    footer {
      bottom: 0; /* Position the footer at the bottom */
      right: 0; /* Position the footer at the right */
      width: auto; /* Allow the footer to adjust its width */
      padding: 2px;
      display: inline-block;
    }
    /* Prevent scroll bars and maintain window size in both portrait and landscape modes */
    body {
      overflow: hidden;
    }
  }
}
