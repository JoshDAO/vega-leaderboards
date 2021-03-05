import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

function createData(address, balance) {
  return { address, balance }
}
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
  },
}))(TableRow)

const rows = [
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
  createData('0x3209b0e85b131f56e1b3a1631bbe', 352224.652155),
]

const Leaderboard = () => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>ADDRESS</StyledTableCell>
            <StyledTableCell align='center'>BALANCE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.address}>
              <StyledTableCell component='th' scope='row' align='center'>
                {row.address}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.balance}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Leaderboard
