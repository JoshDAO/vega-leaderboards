import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import podium from './Images/podium.png'
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
    fontSize: '3rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },
  button: {
    fontSize: '2rem',
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
          borderBottom: '5px solid white',
        }}
      >
        <Toolbar style={{ height: '100%' }}>
          <img src={podium} height={'70'} style={{ margin: '0.5rem 0 1rem 0' }} />
          <Typography variant='h6' className={classes.title}>
            VEGA LEADERBOARDS
          </Typography>
          <a className={classes.anchor} href={'https://google.com'}>
            <Button color='inherit' className={classes.button}>
              FAQs
            </Button>
          </a>
          <a className={classes.anchor} href={'https://vega.xyz/'}>
            <Button color='inherit' className={classes.button}>
              Vega
            </Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  )
}
