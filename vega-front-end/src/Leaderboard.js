import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { IoMdArrowDropdown } from 'react-icons/io'

import LeaderboardRow from './LeaderboardRow'
import { colors } from './styles'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: '1.2rem',
  },
  body: {
    fontSize: '1rem',
  },
}))(TableCell)

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     borderRight: 'none',
//   },
// }))(TableRow)

const styles = {
  sortIcon: {
    position: 'relative',
    top: 5,
  },
}

const Leaderboard = () => {
  const classes = useStyles()
  const [leaderboardData, setLeaderboardData] = useState([])

  useEffect(() => {
    fetch('https://vega-leaderboard.herokuapp.com/api/leaderboards')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data
          .filter((item) => item.party_id !== 'network')
          .sort((a, b) => b['roi(%)'] - a['roi(%)'])
        console.log(sortedData)
        setLeaderboardData(sortedData)
      })
  }, [])

  const sortLeaderBoardBy = (field) => {
    const sortedData = [...leaderboardData]
    sortedData.sort((a, b) => {
      return b[field] - a[field]
    })

    setLeaderboardData(sortedData)
  }

  return leaderboardData.length ? (
    <TableContainer component={Paper} style={{ backgroundColor: 'black' }}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('party_id')}
              align='right'
            >
              Party ID &nbsp;
              <IoMdArrowDropdown size={25} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('account_balance')}
              align='right'
            >
              Balance ($)&nbsp;
              <IoMdArrowDropdown size={25} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('profit')}
              align='right'
            >
              Profit ($)&nbsp;
              <IoMdArrowDropdown size={25} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('realised_pnl')}
              align='right'
            >
              Realised PNL ($)&nbsp;
              <IoMdArrowDropdown size={25} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('unrealised_pnl')}
              align='right'
            >
              Unrealised PNL ($)&nbsp;
              <IoMdArrowDropdown size={25} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('roi(%)')}
              align='right'
            >
              ROI (%)&nbsp;
              <IoMdArrowDropdown size={25} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell align='right'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardData.map((row, index) => (
            <LeaderboardRow
              key={row.party_id}
              index={index}
              account_balance={formatter.format(row.account_balance)}
              party_id={row.party_id}
              profit={formatter.format(row.profit)}
              realisedpnl={formatter.format(row.realised_pnl)}
              unrealisedpnl={formatter.format(row.unrealised_pnl)}
              roi={row['roi(%)'].toFixed(2)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null
}

export default Leaderboard
