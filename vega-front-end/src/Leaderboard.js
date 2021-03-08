import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import LeaderboardRow from './LeaderboardRow'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: '2rem',
  },
  body: {
    fontSize: '1.5rem',
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    borderRight: 'none',
  },
}))(TableRow)

const Leaderboard = () => {
  const classes = useStyles()
  const [leaderboardData, setLeaderboardData] = useState([])
  useEffect(() => {
    fetch('https://vega-leaderboard.herokuapp.com/api/leaderboards')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.filter((item) => item.party_id !== 'network').reverse()
        console.log(sortedData)
        setLeaderboardData(sortedData)
      })
  }, [])

  return leaderboardData.length ? (
    <TableContainer component={Paper} style={{ backgroundColor: 'black' }}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align='center'>ADDRESS</StyledTableCell>
            <StyledTableCell align='center'>BALANCE</StyledTableCell>
            <StyledTableCell align='center'>PROFIT</StyledTableCell>
            <StyledTableCell align='center'>REALISED_PNL</StyledTableCell>
            <StyledTableCell align='center'>ROI_%</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardData.map((row, index) => (
            <LeaderboardRow
              key={row.id}
              index={index}
              account_balance={row.account_balance}
              party_id={row.party_id}
              profit={row.profit}
              pnl={row.realised_pnl}
              roi={row['roi(%)']}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null
}

export default Leaderboard
