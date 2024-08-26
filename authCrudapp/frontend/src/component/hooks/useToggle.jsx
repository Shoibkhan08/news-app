import React from 'react'

export default function useToggle() {
    const [isToggled, setIsToggled] = React.useState(false)

    const openSlider=()=>{
        setIsToggled(true)
    }
    const closeSlider=()=>{
        setIsToggled(false)
    }

  return (
    {isToggled, openSlider, closeSlider}
  )
}
