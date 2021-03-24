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

{
  /* ---- ADD THE NEW PROP HERE ---- */
}
const LeaderboardRow = ({
  index,
  party_id,
  account_balance,
  profit,
  realisedpnl,
  unrealisedpnl,
  roi,
  sharpe,
  breakdown,
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

  Highcharts.setOptions({
    colors: [
      '#2f7ed8',
      '#0d233a',
      '#8bbc21',
      '#910000',
      '#1aadce',
      '#492970',
      '#f28f43',
      '#77a1e5',
      '#c42525',
      '#a6c96a',
    ],
  })

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

  const formatPieData = (breakdown) => {
    const output = []
    for (let property in breakdown) {
      output.push({ name: property, y: breakdown[property] })
    }
    return output
  }

  const pieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: '#000',
    },
    title: {
      text: 'Portfolio Breakdown ($)',
      style: { color: colors.white },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          color: colors.white,
          crop: true,
        },
        center: ['50%', '50%'],
        size: '70%',
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: formatPieData(breakdown),
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
        {/* ---- COPY AND PASTE THE CODE FOR ONE TABLE CELL ---- */}
        <StyledTableCell style={{ color: colors.white }} align='right'>
          {account_balance}
        </StyledTableCell>
        {/* ---- UNTIL HERE ---- */}
        {/* ---- PASTE IT - ENSURE YOU HAVE THE SAME ORDER AS YOUR TABLE HEADINGS  ---- */}
        {/* ---- STYLE ACCORDINGLY AND PUT THE NEW PROP IN BETWEEN THE TAGS ---- */}
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
        <StyledTableCell style={{ color: sharpe < 0 ? 'red' : '#33ff33' }} align='right'>
          {sharpe}
        </StyledTableCell>
        <StyledTableCell align='right'>
          <IoMdExpand size={'1.5rem'} />
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        {/* ---- INCREMENT COLSPAN BY 1 ---- */}
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} align='right' colSpan={9}>
          <Collapse
            in={expanded}
            timeout='auto'
            unmountOnExit
            style={{ margin: 'auto', padding: '2rem 0' }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '65%' }}>
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
                        width: '50%',
                        border: displayChart === 'balance' ? '3px solid white' : 'none',
                      }}
                      onClick={() => setDisplayChart('balance')}
                    >
                      Balance
                    </div>
                    <div
                      style={{
                        ...styles.chartOption,
                        width: '50%',
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
              </div>
              <div style={{ width: '35%' }}>
                <HighchartsReact highcharts={Highcharts} options={pieOptions} />
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
