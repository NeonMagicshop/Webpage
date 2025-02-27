import React from 'react'
import Hero from '../components/Hero'
import LatestItems from '../components/LatestItems'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import MetaPixel from '../utils/meta/MetaPixel'

function Home() {
  return (
    <div>
      <MetaPixel />
      <Hero />
      <LatestItems />
      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home
