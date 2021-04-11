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
import ClipLoader from 'react-spinners/ClipLoader'

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
    fontSize: '0.9rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  body: {
    fontSize: '1rem',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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

const Leaderboard = ({ botFilter }) => {
  const classes = useStyles()
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(false)
  const bots = botFilter
    ? [
        'fb877c5fda34a34f01b174abbd6f0156131bd1ce60d531956ac2f7b99410eb5b',
        '8f0cc5ad59b0cf2b8ef4d653e1ad475d57c8be9115b2816415e554b2d29751b9',
        '87e44f22674555e842893589af439f4238331f902a733188c53d02cd2dcc7643',
        'af8355917f6ee57a85dabc5ae4df9a47048a9550c53188f9fc6efd5fe114fd8c',
        'fb4a768f0f5ef89397361afe4e6ca5c3cf3ca9fd70fb072bc8b9758f647f2d79',
        '7a100abea1f20a1e133500ca2e9821677cd031818953e5e96def7da025a07aca',
        '5e6fb3aac1089dabd75aea8f1cfd6bbf727b665fa0790c4db757ae1945dea93f',
        'ab4d293a1d5fe0c44d07746945b885c7cc5778e4b30dd8c690dc83440d3e2efe',
        'cb010f09289bc52cc849a9d590478e4a1f58c4c99992f8fe38ba81747c020e7e',
        '5b11f8eb11f30c65ec36da4b7889836e43e4f877e8cbd3db1b821fe964a03ddc',
        '8c54677b95cb1b25dda45cb319408dea428040ca28a3813a4fd221e4e6a7ebc9',
        'd4014e4e3bb285d11964d2aaee4e662971bcbfa5348db6e2710b45cbe3d6298b',
        '316a45c524480dafd9f02671ca6e92e0e071e8b76851ec5e366f96b1f8dba0ce',
        '11712988e1cb3be24d5f664d23478e8c08436862f1f521fe7996628ca89596f9',
        'c5fdc709b3464ca10292437ce493dc0e497b2c3ea22a5fde714c4e487b93011d',
        'fb7fdff60b5de543e30528e8e997911cc7291800733580b2af6a56b0b0d42a47',
        '26e698c1e3a284df201c617f9e3ec1f719d1e8c2f2c5ab16f6b505b23a4704f7',
        'f940e7dbfeabf83a35d8b34387bc903c898464d4bfb79f7e4d496cc44557f672',
        '6f6b0576fcf52c1e985db9d6686c38511ea7dd967e660b9c0ddb424d76101821',
        'bec89156f0c431474eff56dc5245482f1f3357b10232d1208b13af98adc894ca',
        '7f5228bc98bc0901d927f94cdd68597a2448a940e2445d34522ad304e42edfcf',
        '79042cbcff5afd0d50c177870a151d59c0f87bea70614570301047d192f9cfc5',
        '152236da1f56041a23d06dc42db1ae91cf038171378a906360ba330c6b38be5b',
        '6e149468c1dac47a847622a885113daae16da129ee65f0a7ac7be94f0ced17d2',
        'cc1e5d6849202d62e5297c2f81b732c932753b8d20afa0dd115eeda9b7458b95',
        'ec91d7791a91adf2e20764ae1fbaabbf47c2ebf2e9109ff12da96e87651d98a7',
        '10108a5eb825d6b0563979e6f2d4b22919e0e0efc1bdc923dbafd51f705e9543',
        '089081a12d7fd266347dda20a2d3b5932b95ee1a9d110988963093cc97b95147',
        '6e0c7741220ba99187b59a0b52271b16e02dabd4e38c75e7cfa128f0f784e8a7',
        'ce506915b4aa17922bfaf4cc0413601eb8827099870f8c0a177248ae4dac304a',
        'bc88502e7ee712c35ff319315e6c7acb8485601174268ea99e9aef853a9872b8',
        '118e5860eace81501203b4c057b0bd886a1350f11e6a72551256072c698c689a',
        'e0f2851ffec4bbede1623ef42729a1c4773a175c790d0830c3dd5cc9cb931d48',
        '66393702d112ea4a849e8b471f3c6819c2075bd60bbb8da46d4734a7f86da734',
        'f54b3aa700191e4eec908d2712ef06a3d3a89b29d494f53844ce168011901a7d',
        '83f2bafd1e7475d13535328f4540b655b238c3d71ebd6f7f48ef6e6d549f87b8',
        'e11b916665bb293edcd0e70570ad43d124e1f6d370d82cce13d96eed570d1378',
        '91ae1ac4a62c9beabd3f14bf03cb0adf8b43ad62b6357acb13c6e78a5711c79c',
        'fe0cd5da61aa37a92f077224c2f1876fa77fb5a09877e25ce11ef10c6f62d974',
        'd2f56775f032ce6440d47c81f75648fcb9ec200067b6f97faa8c4bf207d34934',
        'dde6ff5db9eda6e4fd6b932dbb73c7b46531beff3675f0c3041386ee80fc5927',
        '00b20f158db5db0826e4d32b6a3bb86f2c80b5ce675b6fa2dcaa2a1bf0c632f1',
        '06235c026a7154527c206c10297d0778d2464724532644a88c6572688ab458df',
        'b0aa333a6b73240edef64a8910a2d5ae4747abcdce189be77f789039c198f1b8',
        '26af80a94f3fbd595e1d8bdabcc24fe8cecf89778e677322f1143145113571a6',
        '52f691a0f55b0ef6c23665830db66dc751b38d8134bc520725b80f94128ccfb9',
        '85e74fbdd099e7ff1ee6ce7c603a756420dcdfa62b155dcfdcddc6d261ed5e1a',
        '432662384dae81b8508b8306a535531c5db94642f69883918c7bd8de5671e943',
      ]
    : []

  useEffect(() => {
    setLoading(true)
    fetch('https://vega-leaderboard.herokuapp.com/api/leaderboards')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data
          .filter((item) => item.party_id !== 'network')
          .sort((a, b) => b['roi(%)'] - a['roi(%)'])
        console.log(sortedData)
        setLeaderboardData(sortedData)
        setLoading(false)
      })
  }, [])

  const sortLeaderBoardBy = (field) => {
    const sortedData = [...leaderboardData]
    sortedData.sort((a, b) => {
      return b[field] - a[field]
    })

    setLeaderboardData(sortedData)
  }

  return loading ? (
    <>
      <h1 style={{ color: colors.white, marginTop: '30vh' }}>Retrieving data...</h1>
      <ClipLoader loading={loading} color={colors.white} />
    </>
  ) : leaderboardData.length ? (
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
              PARTY ID &nbsp;
              <IoMdArrowDropdown size={'1.5rem'} style={styles.sortIcon} />
            </StyledTableCell>
            {/* ----- TO ADD A NEW COLUMN ----- */}
            {/* COPY THE FOLLOWING CHUNK OF CODE */}

            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('account_balance')}
              align='right'
            >
              BALANCE ($)&nbsp;
              <IoMdArrowDropdown size={'1.5rem'} style={styles.sortIcon} />
            </StyledTableCell>
            {/* ---- UNTIL HERE ---- */}

            {/* ---- PASTE THE CODE FOR THE NEW COLUMN WHEREVER YOU WANT THE COLUMN TO APPEAR ---- */}
            {/* ---- IF YOU PASTE IT HERE, THE NEW COLUMN WILL APPEAR BETWEEN BALANCE AND PROFIT ---- */}
            {/* ---- CHANGE THE ONCLICK FUNCTION TO SORTLEADERBOARD BY NEW PROPERTY ---- */}
            {/* ---- THE ARGUMENT MUST *EXACTLY* MATCH THE PROPERTY NAME FROM THE API ---- */}
            {/* ---- REPLACE TEXT BETWEEN CALL TAGS APPROPRIATELY ---- */}

            {/* ---- SCROLL DOWN TO THE MAP FUNCTION ---- */}

            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('profit')}
              align='right'
            >
              PROFIT ($)&nbsp;
              <IoMdArrowDropdown size={'1.5rem'} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('realised_pnl')}
              align='right'
            >
              REALISED PNL ($)&nbsp;
              <IoMdArrowDropdown size={'1.5rem'} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('unrealised_pnl')}
              align='right'
            >
              UNREALISED PNL ($)&nbsp;
              <IoMdArrowDropdown size={'1.5rem'} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('roi(%)')}
              align='right'
            >
              ROI (%)&nbsp;
              <IoMdArrowDropdown size={'1.5rem'} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell
              style={{ cursor: 'pointer' }}
              onClick={() => sortLeaderBoardBy('sharpe_ratio (daily)')}
              align='right'
            >
              SHARPE RATIO (DAILY)&nbsp;
              <IoMdArrowDropdown size={'1.5rem'} style={styles.sortIcon} />
            </StyledTableCell>
            <StyledTableCell align='right'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* ---- ADD THE NEW PROPERTY HERE AS A PROP ---- */}
          {/* ---- GO TO LeaderboardRow.js ---- */}
          {leaderboardData
            .filter((row) => !bots.includes(row.party_id))
            .map((row, index) => (
              <LeaderboardRow
                key={row.party_id}
                index={index}
                account_balance={formatter.format(row.account_balance)}
                party_id={row.party_id}
                profit={formatter.format(row.profit)}
                realisedpnl={formatter.format(row.realised_pnl)}
                unrealisedpnl={formatter.format(row.unrealised_pnl)}
                roi={row['roi(%)'].toFixed(2)}
                sharpe={row['sharpe_ratio (daily)'].toFixed(3)}
                breakdown={row.breakdown}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null
}

export default Leaderboard
