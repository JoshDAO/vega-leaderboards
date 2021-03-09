import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Collapse from '@material-ui/core/Collapse'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IoMdExpand} from 'react-icons/io'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: '2rem',
  },
  body: {
    fontSize: '1rem',
    color: 'white',
    fontWeight: 250,
  },
  root: {
    padding: "8px 32px"
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: 'black',
    color: 'white',
  }
}))(TableRow)

const LeaderboardRow = ({ index, party_id, account_balance, profit, pnl, roi }) => {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [readOnlyChartData, setReadOnlyChartData] = useState([])
  const [period, setPeriod] = useState(86400000 * 365)

  const handleExpand = () => {
    if (!expanded) {
      setLoading(true)
      fetch(`https://vega-leaderboard.herokuapp.com/api/address/${party_id}`)
        .then((response) => response.json())
        .then((data) => {
          const sortedData = data.data
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((item) => {
              return [item.timestamp * 1000, item.account_balance / 1000000]
            })
          console.log(sortedData)
          setChartData(sortedData)
          setReadOnlyChartData(sortedData)
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
        scrollPositionX: 1,
      },
      backgroundColor: '#000',
      style: {
        fontSize: '1.2rem',
      },
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
        },
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
        text: 'Balance (millions)',
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
        data: chartData.filter((dataPoint) => dataPoint[0] > Date.now() - period),
        color: 'white',
      },
    ],
  }

  const filterTime = (period) => {
    const tempData = readOnlyChartData.map((object) => [...object])
    console.log('tempData: ', tempData)
    setChartData(tempData.filter((dataPoint) => dataPoint[0] > Date.now() - period))
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
        <StyledTableCell align='center'>
          <IoMdExpand size={'1.5rem'} />
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} align='center' colSpan={7}>
          <Collapse
            in={expanded}
            timeout='auto'
            unmountOnExit
            style={{ margin: 'auto', padding: '2rem' }}
          >
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div
              style={{
                border: '3px solid white',
                width: '20%',
                height: '2.5rem',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent:
                  'space-evenghlighting of a single point. Can be used to remove, edit or display information about a point.ly',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  cursor: 'pointer',
                  border: period === 86400000 ? '3px solid white' : 'none',
                  boxSizing: 'border-box',
                  padding: '0 0.5rem',
                  width: '25%',
                }}
                onClick={() => setPeriod(86400000)}
              >
                24h
              </div>
              <div
                style={{
                  cursor: 'pointer',
                  border: period === 86400000 * 7 ? '3px solid white' : 'none',
                  boxSizing: 'border-box',
                  padding: '0 0.5rem',
                  width: '25%',
                }}
                onClick={() => setPeriod(86400000 * 7)}
              >
                7d
              </div>
              <div
                style={{
                  cursor: 'pointer',
                  border: period === 86400000 * 30 ? '3px solid white' : 'none',
                  boxSizing: 'border-box',
                  padding: '0 0.5rem',
                  width: '25%',
                }}
                onClick={() => setPeriod(86400000 * 30)}
              >
                30d
              </div>
              <div
                style={{
                  cursor: 'pointer',
                  border: period === 86400000 * 365 ? '3px solid white' : 'none',
                  boxSizing: 'border-box',
                  padding: '0 0.5rem',
                  width: '25%',
                }}
                onClick={() => setPeriod(86400000 * 365)}
              >
                1y
              </div>
            </div>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

export default LeaderboardRow

// 1615237976905.4324
// 1615238724248
// 86400000
