import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'

import { purple, grey, green, red } from '@material-ui/core/colors'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import './App.css'
import Leaderboard from './Leaderboard'
import { colors, styles } from './styles'
import ButtonAppBar from './Navbar'
import { color } from 'highcharts'

const useStyles = makeStyles((theme) => ({
  label: {
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    fontSize: '1.5rem',
  },
  checkbox: {
    //display: 'inline-block',
    // position: 'relative',
    // top: '-40px',
    width: '16px',
    height: '16px',
    margin: '-1px 0px 0 0',
    verticalAlign: 'middle',
    background: 'white left top no-repeat',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
}))

const GreySwitch = withStyles({
  switchBase: {
    color: colors.red,
    opacity: 1,
    '&$checked': {
      color: colors.green,
    },
    '&$checked + $track': {
      backgroundColor: green[200],
    },
  },
  checked: {},
  track: {
    backgroundColor: red[200],
  },
})(Switch)

function App() {
  const classes = useStyles()

  const [botFilter, setBotFilter] = useState(true)

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
        <div style={{ color: colors.white, display: 'flex', alignItems: 'center' }}>
          <label className={classes.label} for={'bot-filter'}>
            Filter out bots:
          </label>
          <GreySwitch id={'bot-filter'} onChange={() => setBotFilter(!botFilter)} defaultChecked />
          <p style={{ color: colors.white, display: 'flex', alignItems: 'right' }}>
          Please note: Vega Protocol is in testnet. We have attempted to account for all known bots, but bots may still be included.
        </p>
        </div>

        <Leaderboard botFilter={botFilter} />
      </div>
    </div>
  )
}

export default App
