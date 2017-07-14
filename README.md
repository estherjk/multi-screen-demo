# multi-screen-demo

multi-screen-demo is a [node.js](http://nodejs.org/) app that uses [socket.io](http://socket.io/) (WebSockets) to pair a mobile and a PC, allowing seamless and responsive two-way interaction between paired devices. The goal of the app is to illustrate the use of WebSockets and hopefully give people some inspiration to create compelling multi-screen scenarios.

## Link

You can check out the app in action [here](http://multi-screen-demo.herokuapp.com/).

## Overview

The app contains two demos:

* Gestures
    * Use gestures on a mobile and show the detected events on a paired PC
    * The demo uses [hammer.js](http://eightmedia.github.io/hammer.js/), a JavaScript library for multi-touch gestures, and [angular-hammer](http://monospaced.github.io/angular-hammer/), an [AngularJS](http://angularjs.org/) directive that adds [hammer.js](http://eightmedia.github.io/hammer.js/) support
* D-pad
    * A simple D-pad controller for a mobile, which moves a target around on a paired PC
    * The demo uses the touch and release events in [hammer.js](http://eightmedia.github.io/hammer.js/); also uses [angular-hammer](http://monospaced.github.io/angular-hammer/)
    * At the moment, the demo is a bit of a hack, where [jQuery's animate()](https://api.jquery.com/animate/) function is used to move the target ([using jQuery is not very Angular](http://stackoverflow.com/questions/14994391/how-do-i-think-in-angularjs-if-i-have-a-jquery-background)); this was the fastest (and simplest) path to illustrate the use of a D-pad controller without using intervals, worrying about things like collision detection, and so on; since [animate()](https://api.jquery.com/animate/) requires a duration, the animation will just end after 20s (an arbitrary value I picked), even if one of the D-pad buttons is still pressed

Also, this app was tested in [Chrome](http://www.google.com/chrome). If you experience any issues using [socket.io](http://socket.io/) or [hammer.js](http://eightmedia.github.io/hammer.js/) with another browser, please try using [Chrome](http://www.google.com/chrome).

## Node.js requirements

This web app runs with Node.js v0.12.7. The best way to install it is using [nvm](https://github.com/creationix/nvm). A .nvmrc file is also included in this project's root folder.

*Note: [support for Node.js 0.12.x has officially ended](https://nodejs.org/en/blog/release/v0.12.13/). There are no plans to update this project to work on a newer version of Node.js at this time.*