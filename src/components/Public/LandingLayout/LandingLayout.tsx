import React from 'react'
import {Outlet} from 'react-router-dom'

type CountProviderProps = {children: React.ReactNode}

function LandingLayout() {
  return (
      <Outlet/>
  )
}

export default LandingLayout