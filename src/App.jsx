import { Navbar, Welcome , Dock } from '#components'
import { Terminal } from '#windows';
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
gsap.registerPlugin(Draggable);
import React from 'react'

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
    </main>
  ) 
}

export default App
