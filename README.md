## Lottie web for React

Blog : https://medium.com/@tanisha_verma/lottie-and-react-hooks-1adb4713446b

Lottie-web-react is a wrapper for lottie-web  using React hooks.
For more information on lottie-web visit [https://github.com/airbnb/lottie-web](https://github.com/airbnb/lottie-web)

Demo : [https://tanisha-verma.github.io/lottie-web-react/](https://tanisha-verma.github.io/lottie-web-react/)

## Installation

Install through npm:

```
npm install --save lottie-web-react
```
## Usage



    import  React, { useState } from  'react'
    import  Lottie  from  'lottie-web-react'
    let  watchAnimationData = require('./stopwatch.json')
    const  renderer ='svg'
    const  rendererSettings = {
    preserveAspectRatio:  'xMinYMin slice',
    }

    function  MyAnimation() {
    const [playingState, setPlayingState] = useState('play')
    const [autoplay, setAutoplay] = useState(false)
    const [loop, setLoop] = useState(true)
    const [path, setPath] = useState('https://assets2.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json')
    const [animationData, setAnimationData] = useState(watchAnimationData)
    const [speed, setSpeed] = useState(1)
    const [direction, setDirection] = useState(1)
    return (
    <Lottie
    options={{
    renderer:  renderer,
    loop:  loop,
    autoplay:  autoplay,
    path:  path,
    animationData:  animationData,
    rendererSettings:  rendererSettings
    }}
    playingState={playingState}
    speed={speed}
    direction={direction}
    />
    )
    }
    export  default  MyAnimation

## **Props**

***options***

Used for loading the animation
-   animationData: an Object with the exported animation data.
-   path: the relative path to the animation object. (animationData and path are mutually exclusive)
-   loop: true / false / number
-   autoplay: true / false it will start playing as soon as it is ready
-   name: animation name for future reference
-   renderer: 'svg' / 'canvas' / 'html' to set the renderer

Note : If path and animationData both are passed then the animation instance is created using path and not animationData.
##
***playingState*** :

Accepts three values : '**play**' , '**pause**' or '**stop**' .
'play' : Plays lottie animation once the animation is loaded by using lottie-web's play() method.
'pause' : Plays lottie animation once the animation is loaded. Uses lottie-web's pause() method.
'stop' : Stops lottie animation if the animation is loaded by using lottie-web's stop() method.
##
***id***

Optional.
##
***className***

Pass custom class to modify the container.
##
***direction***

Accepts two values : '**1**' or  '**-1**' .
Uses lottie-web's setDirection() method.
1 is forward, -1 is reverse.
##
***speed***

Accepts number.
Uses lottie-web's setSpeed() method.
1 is normal speed.
##
***goToAndPlay***

Type : object.
Should contain following parameters :
-   `value`: numeric value.
-   `isFrame`: defines if first argument is a time based value or a frame based (default false).

Uses lottie-web's goToAndPlay() method.
##
***playSegments***

Type : object.
Should contain following parameters :
-   `segments`: array. Can contain 2 numeric values that will be used as first and last frame of the animation. Or can contain a sequence of arrays each with 2 numeric values.
-   `forceFlag`: boolean. If set to false, it will wait until the current segment is complete. If true, it will update values immediately.(default false).

Uses lottie-web's playSegments() method.
##
***eventListeners***

Type : array.
You can pass list of events and its callbacks to dispatch any action once the event is triggered.

Example use case:
[{
eventName:  'loopComplete',
callback: () => { setLoopCounter(loopCounter + 1) }
}]

Once a loop is completed by animation the event 'loopComplete' is triggered and it calls setLoopCounter action to increment the loopCounter.

 Following events can be added:
-   complete
-   loopComplete
-   enterFrame
-   segmentStart
-   config_ready (when initial config is done)
-   data_ready (when all parts of the animation have been loaded)
-   data_failed (when part of the animation can not be loaded)
-   loaded_images (when all image loads have either succeeded or errored)
-   DOMLoaded (when elements have been added to the DOM)
-   destroy
##
