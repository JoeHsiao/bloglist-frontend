import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [childVisible, setChildVisible] = useState(false)

  const toggleVisible = () => {
    setChildVisible(!childVisible)
  }

  const showWhenVisible = { display: childVisible ? '' : 'none' }
  const hideWhenVisible = { display: childVisible ? 'none' : '' }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </>
  )
})

export default Togglable