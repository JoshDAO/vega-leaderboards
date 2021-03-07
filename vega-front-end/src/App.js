import './App.css'
import Leaderboard from './Leaderboard'
function App() {
  return (
    <div style={{ backgroundColor: 'black', height: '100vh', padding: '5rem' }}>
      <div
        className='App'
        style={{
          width: '90%',
          margin: 'auto',
          marginTop: '5rem',
          fontFamily: "Helvetica Neue',Helvetica,Arial,sans-serif",
          backgroundColor: 'black',
        }}
      >
        <Leaderboard />
      </div>
    </div>
  )
}

export default App
