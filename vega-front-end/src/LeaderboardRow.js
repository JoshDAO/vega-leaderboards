import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Collapse from '@material-ui/core/Collapse'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { IoMdExpand } from 'react-icons/io'
import { colors, styles } from './styles'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: '2rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },
  body: {
    fontSize: '1rem',
    color: colors.white,
    fontWeight: 300,
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },
  root: {
    padding: '8px 16px',
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: colors.black,
    color: colors.white,
  },
}))(TableRow)

const LeaderboardRow = ({
  index,
  party_id,
  account_balance,
  profit,
  realisedpnl,
  unrealisedpnl,
  roi,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [chartData, setChartData] = useState([])
  const [period, setPeriod] = useState(86400000 * 365)
  const [displayChart, setDisplayChart] = useState('balance')

  const handleExpand = () => {
    if (!expanded) {
      fetch(`https://vega-leaderboard.herokuapp.com/api/address/${party_id}`)
        .then((response) => response.json())
        .then((data) => {
          const sortedData = data.data
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((item) => {
              console.log(item)
              return [item.timestamp * 1000, item.account_balance / 1000000, item['roi(%)']]
            })
          console.log(sortedData)
          setChartData(sortedData)
        })
    }
    setExpanded(!expanded)
  }

  const balanceOptions = {
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
      style: { color: colors.white, fontSize: '1.5rem', fontWeight: 600 },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
        style: { color: colors.lightGrey, fontSize: '1rem' },
      },
    },
    yAxis: {
      title: {
        text: 'Balance (millions)',
        style: { color: colors.white, fontSize: '1.3rem', fontWeight: 500 },
      },
      labels: {
        style: { color: colors.lightGrey, fontSize: '1rem', fontWeight: 600 },
      },
      gridLineColor: '#555',
    },

    series: [
      {
        name: 'Balance',
        data: chartData
          .map((datapoint) => [datapoint[0], datapoint[1]])
          .filter((dataPoint) => dataPoint[0] > Date.now() - period), //  filters data according to time set on graph
        color: 'white',
      },
    ],
  }
  const roiOptions = {
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
      style: { color: colors.white, fontSize: '1.5rem', fontWeight: 600 },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
        style: { color: colors.lightGrey, fontSize: '1rem' },
      },
    },
    yAxis: {
      title: {
        text: 'ROI (%)',
        style: { color: colors.white, fontSize: '1.3rem', fontWeight: 500 },
      },
      labels: {
        style: { color: colors.lightGrey, fontSize: '1rem', fontWeight: 600 },
      },
      gridLineColor: '#555',
    },

    series: [
      {
        name: 'ROI (%)',
        data: chartData
          .map((datapoint) => [datapoint[0], datapoint[2]])
          .filter((dataPoint) => dataPoint[0] > Date.now() - period), //  filters data according to time set on graph
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
        <StyledTableCell component='th' scope='row' align='right'>
          {party_id.substr(0, 5).concat('...').concat(party_id.substr(-4))}
        </StyledTableCell>
        <StyledTableCell style={{ color: colors.white }} align='right'>
          {account_balance}
        </StyledTableCell>
        <StyledTableCell
          style={{ color: parseInt(profit.replace(/\$|\,/, '')) < 0 ? 'red' : '#33ff33' }}
          align='right'
        >
          {profit}
        </StyledTableCell>
        <StyledTableCell
          style={{ color: parseInt(realisedpnl.replace(/\$|\,/, '')) < 0 ? 'red' : '#33ff33' }}
          align='right'
        >
          {realisedpnl}
        </StyledTableCell>
        <StyledTableCell
          style={{ color: parseInt(unrealisedpnl.replace(/\$|\,/, '')) < 0 ? 'red' : '#33ff33' }}
          align='right'
        >
          {unrealisedpnl}
        </StyledTableCell>
        <StyledTableCell style={{ color: roi < 0 ? 'red' : '#33ff33' }} align='right'>
          {roi}
        </StyledTableCell>
        <StyledTableCell align='right'>
          <IoMdExpand size={'1.5rem'} />
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} align='right' colSpan={8}>
          <Collapse
            in={expanded}
            timeout='auto'
            unmountOnExit
            style={{ margin: 'auto', padding: '2rem' }}
          >
            {displayChart === 'balance' ? (
              <HighchartsReact highcharts={Highcharts} options={balanceOptions} />
            ) : (
              <HighchartsReact highcharts={Highcharts} options={roiOptions} />
            )}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <div style={styles.chartOptionContainer}>
                <div
                  style={{
                    ...styles.chartOption,
                    border: displayChart === 'balance' ? '3px solid white' : 'none',
                  }}
                  onClick={() => setDisplayChart('balance')}
                >
                  Balance
                </div>
                <div
                  style={{
                    ...styles.chartOption,
                    border: displayChart === 'roi' ? '3px solid white' : 'none',
                  }}
                  onClick={() => setDisplayChart('roi')}
                >
                  ROI (%)
                </div>
              </div>
              <div style={styles.chartOptionContainer}>
                <div
                  style={{
                    ...styles.chartOption,
                    border: period === 86400000 ? '3px solid white' : 'none',
                  }}
                  onClick={() => setPeriod(86400000)}
                >
                  24h
                </div>
                <div
                  style={{
                    ...styles.chartOption,
                    border: period === 86400000 * 7 ? '3px solid white' : 'none',
                  }}
                  onClick={() => setPeriod(86400000 * 7)}
                >
                  7d
                </div>
                <div
                  style={{
                    ...styles.chartOption,
                    border: period === 86400000 * 30 ? '3px solid white' : 'none',
                  }}
                  onClick={() => setPeriod(86400000 * 30)}
                >
                  30d
                </div>
                <div
                  style={{
                    ...styles.chartOption,
                    border: period === 86400000 * 365 ? '3px solid white' : 'none',
                  }}
                  onClick={() => setPeriod(86400000 * 365)}
                >
                  1y
                </div>
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
