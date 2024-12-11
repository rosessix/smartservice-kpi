import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ColumnChart} from '@opd/g2plot-react'


function App() {
  const [count, setCount] = useState(0)

  const chart = {
    height: 350,
    autoFit: true,
    xField: 'date',
    yField: 'value',
    smooth: true,
    meta: {
      value: {
        max: 15,
      },
    },
    data: [
      { date: '1-11-2024', value: 3 },
      { date: '2-11-2024', value: 4 },
      { date: '5-11-2024', value: 3.5 },
      { date: '8-11-2024', value: 5 },
      { date: '9-11-2024', value: 4.9 },
      { date: '11-11-2024', value: 6 },
      { date: '23-11-2024', value: 7 },
      { date: '24-11-2024', value: 11 },
      { date: '25-11-2024', value: 5 },
    ],
  }

  return (
    <>
      <p class="text-red-500">Hello there!</p>
      <div class="w-[500px]">
        <ColumnChart {...chart}/>
      </div>
    </>
  )
}

export default App
