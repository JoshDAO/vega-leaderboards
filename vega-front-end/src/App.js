import React, { useState } from 'react'
import './App.css'
import Leaderboard from './Leaderboard'
import { colors, styles } from './styles'
import ButtonAppBar from './Navbar'

function App() {
  const [botFilter, setBotFilter] = useState(false)

  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        height: '100%',
        fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
      }}
    >
      <ButtonAppBar />
      <div
        className='App'
        style={{
          width: '90%',
          margin: 'auto',
          marginTop: '2rem',
          fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
          backgroundColor: 'black',
          padding: '0 5rem',
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
