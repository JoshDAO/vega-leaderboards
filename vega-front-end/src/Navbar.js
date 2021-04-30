import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import vegalogo from './Images/vega-gb-logo.png'
import { colors } from './styles'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(5),
    fontSize: '1.5rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },
  button: {
    fontSize: '1rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    textDecorationLine: 'none',
    color: colors.white,
    marginRight: theme.spacing(8),
  },
  anchor: {
    textDecorationLine: 'none',
    color: colors.white,
    height: '100%',
    '& :hover': {
      backgroundColor: colors.white,
      color: colors.black,
    },
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        style={{
          backgroundColor: colors.black,
          borderBottom: '2px solid white',
        }}
      >
        <Toolbar style={{ height: '100%' }}>
          <img src={vegalogo} height={'100'} style={{ margin: '0.5rem 0 1rem 0' }} />
          <Typography variant='h6' className={classes.title}>
            Vega Leaderboards
          </Typography>
          <a className={classes.anchor} href={'https://vega.xyz/'}>
            <Button color='inherit' className={classes.button}>
              Vega Protocol
            </Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  )
}
