import React from 'react'
import ReactDOM from 'react-dom'
import Demo from './demo/demo'

/**
 *
 * This component is not exported from the library.
 */
function AppHook() {

  return (
    <Demo />
  )
}
export default AppHook

ReactDOM.render(<AppHook />, document.getElementById('root'))
