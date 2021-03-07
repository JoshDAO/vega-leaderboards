import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Collapse from '@material-ui/core/Collapse'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

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

const LeaderboardRow = ({ index, party_id, account_balance, profit, pnl, roi }) => {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])

  const handleExpand = () => {
    setLoading(true)
    setExpanded(true)
    fetch(`https://vega-leaderboard.herokuapp.com/api/address/${party_id}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((item) => {
            return [item.timestamp * 1000, item.account_balance]
          })
        console.log(sortedData)
        setChartData(sortedData)
      })
  }

  const dummyData = [
    [3, 34],
    [4, 36],
  ]
  const options = {
    chart: {
      type: 'spline',
      scrollablePlotArea: {
        minWidth: 1000,
        scrollPositionX: 1,
      },
    },
    title: {
      text: `Address ${party_id.substr(0, 5).concat('...').concat(party_id.substr(-4))}`,
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
      },
    },
    yAxis: {
      title: {
        text: 'Balance',
      },
    },

    series: [
      {
        name: 'Balance',
        data: chartData,
      },
    ],
  }

  return (
    <>
      <StyledTableRow onClick={handleExpand}>
        <StyledTableCell style={{ fontWeight: 700, paddingLeft: '3rem' }}>
          {index + 1}
        </StyledTableCell>
        <StyledTableCell component='th' scope='row' align='center'>
          {party_id.substr(0, 5).concat('...').concat(party_id.substr(-4))}
        </StyledTableCell>
        <StyledTableCell align='center'>{account_balance}</StyledTableCell>
        <StyledTableCell align='center'>{profit}</StyledTableCell>
        <StyledTableCell align='center'>{pnl}</StyledTableCell>
        <StyledTableCell align='center'>{roi}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} align='center' colSpan={6}>
          <Collapse
            in={expanded}
            timeout='auto'
            unmountOnExit
            style={{ margin: 'auto', padding: '2rem' }}
          >
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

export default LeaderboardRow
