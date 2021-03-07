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
    color: 'white',
    fontWeight: 500,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: 'black',
    color: 'white',
  },
}))(TableRow)

const LeaderboardRow = ({ index, party_id, account_balance, profit, pnl, roi }) => {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])

  const handleExpand = () => {
    if (!expanded) {
      setLoading(true)
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
      setLoading(false)
    }
    setExpanded(!expanded)
  }

  const dummyData = [
    [3, 34],
    [4, 36],
  ]
  const options = {
    chart: {
      type: 'line',
      scrollablePlotArea: {
        minWidth: 1000,
        scrollPositionX: 1,
      },
      backgroundColor: '#000',
      style: {
        fontSize: '1.2rem',
      },
    },
    legend: {
      enabled: false,
    },
    title: {
      text: `Address ${party_id.substr(0, 5).concat('...').concat(party_id.substr(-4))}`,
      style: { color: 'white', fontSize: '1.5rem', fontWeight: 600 },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
        style: { color: '#aaa', fontSize: '1rem' },
      },
    },
    yAxis: {
      title: {
        text: 'Balance',
        style: { color: 'white', fontSize: '1.3rem', fontWeight: 500 },
      },
      labels: {
        style: { color: '#aaa', fontSize: '1rem', fontWeight: 600 },
      },
      gridLineColor: '#555',
    },

    series: [
      {
        name: 'Balance',
        data: chartData,
        color: 'white',
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
