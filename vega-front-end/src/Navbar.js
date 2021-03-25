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
    fontSize: '2rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },
  button: {
    fontSize: '1.5rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        style={{
          padding: '0 5rem',
          backgroundColor: colors.black,
          borderBottom: '3px solid white',
        }}
      >
        <Toolbar>
          <img src={podium} height={'70'} style={{ margin: '0.5rem 0 1rem 0' }} />
          <Typography variant='h6' className={classes.title}>
            VEGA LEADERBOARDS
          </Typography>
          <Button color='inherit' className={classes.button}>
            FAQs
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
