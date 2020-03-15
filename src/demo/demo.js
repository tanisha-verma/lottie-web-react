import React, { useState } from 'react'
import Lottie from '../lottie'
import './demo.css'
import * as demoConstants from './demoConstants'
let watchAnimationData = require('./stopwatch.json')

function Demo() {
  const [playingState, setPlayingState] = useState('play')
  const [loopCounter, setLoopCounter] = useState(0)
  const [autoplay, setAutoplay] = useState(false)
  const [loop, setLoop] = useState(true)
  const [path, setPath] = useState('https://assets2.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json')
  const [animationData, setAnimationData] = useState(watchAnimationData)
  const [speed, setSpeed] = useState(1)
  const [direction, setDirection] = useState(1)

  //Segment example variables
  const [activeSegment, setActiveSegment] = useState([0, 10])

  return (
    <div className='demo'>
      <h1>Lottie animations</h1>
      <h2>Props playground</h2>
      <div className='props-playground-container'>
        <div className='props-list'>
          <h4>playingState</h4>
          <div>
            <button onClick={() => setPlayingState('play')}>Play</button>
            <button onClick={() => setPlayingState('pause')}>Pause</button>
            <button onClick={() => setPlayingState('stop')}>Stop</button>
          </div>
          <h4>autoplay</h4>
          <label className='switch'>
            <input type='checkbox' checked={autoplay} onChange={() => setAutoplay(!autoplay)} />
            <span className='slider round'></span>
          </label>
          <h4>loop</h4>
          <label className='switch'>
            <input type='checkbox' checked={loop} onChange={() => setLoop(!loop)} />
            <span className='slider round'></span>
          </label>
          <h4>path</h4>
          <input className='input' value={path} onChange={(e) => setPath(e.target.value)} />
          <h4>animationData</h4>
          <textarea
            className='json-text'
            value={JSON.stringify(animationData)}
            onChange={(e) => e.target.value && setAnimationData(JSON.parse(e.target.value))
            } />
          <h4>speed</h4>
          <input className='input' value={speed} onChange={(e) => setSpeed(e.target.value)} />
          <h4>direction</h4>
          <input
            type='number'
            className='input'
            value={direction}
            maxLength={1}
            min='-1'
            max='1'
            onChange={(e) => setDirection(e.target.value)} />
        </div>
        <div>
          <Lottie
            options={{
              renderer: demoConstants.renderer,
              loop: loop,
              autoplay: autoplay,
              path: path,
              animationData: animationData,
              rendererSettings: demoConstants.rendererSettings
            }}
            playingState={playingState}
            speed={speed}
            direction={direction}
          />
        </div>
      </div>
      <h2 >Easy to add event listeners</h2>
      <div className='events-example'>
        <h3 className='events-counter'>Loop count : {loopCounter}</h3>
        <Lottie
          className='lottie-event-callback'
          options={demoConstants.globeLottieExampleOptions}
          playingState={'play'}
          eventListeners={[{
            eventName: 'loopComplete',
            callback: () => { setLoopCounter(loopCounter + 1) }
          }]}
        />
      </div>
      <h2 >Playing segments</h2>
      <h3>Current Segment : {activeSegment[1]}</h3>
      <div className='segments-example'>
        <Lottie
          options={{
            renderer: demoConstants.renderer,
            loop: false,
            autoplay: true,
            path: 'https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/skip-forward.json',
            rendererSettings: demoConstants.rendererSettings
          }}
          playSegments={{
            segments: activeSegment,
            forceFlag: true
          }}
          playingState={'play'}
          id='segments-example'
          eventListeners={[
            {
              eventName: 'complete', callback: () => {
                if (activeSegment[1] < 60) {
                  setActiveSegment([0, activeSegment[1] + 10])
                }
                else {
                  setActiveSegment([0, 10])
                }

              }
            }
          ]}
        />
      </div>
    </div>

  )
}

export default Demo