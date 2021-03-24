import React, { useState } from 'react'
import './App.css'
import Leaderboard from './Leaderboard'
import { colors, styles } from './styles'
import Switch from '@material-ui/core/Switch'

function App() {
  const [botFilter, setBotFilter] = useState(false)

  return (
    <div style={{ backgroundColor: 'black', height: '100%', padding: '5rem' }}>
      <div
        className='App'
        style={{
          width: '90%',
          margin: 'auto',
          marginTop: '2rem',
          fontFamily: "Helvetica Neue',Helvetica,Arial,sans-serif",
          backgroundColor: 'black',
        }}
      >
        <div style={{ color: colors.white }}>
          <label for={'bot-filter'}>Filter out bots:</label>
          <input
            id={'bot-filter'}
            type='checkbox'
            value={botFilter}
            onChange={() => setBotFilter(!botFilter)}
            checked={botFilter}
          />
        </div>
        <Leaderboard botFilter={botFilter} />
      </div>
    </div>
  )
}

export default App
