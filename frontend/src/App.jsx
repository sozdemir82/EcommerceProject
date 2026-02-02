import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  // State management for API messages and visual feedback
  const [message, setMessage] = useState("Connecting to server...")
  const [statusColor, setStatusColor] = useState("#666")

  useEffect(() => {
    // Fetching data from our Flask backend
    axios.get('http://127.0.0.1:5000/')
      .then(response => {
        // Success: Update UI with the server's response
        setMessage(response.data.message)
        setStatusColor("#2ecc71") // Green for online
      })
      .catch(error => {
        // Error: Inform the user if the backend is down
        console.error("Connection error:", error)
        setMessage("Backend unreachable. Please start Flask server!")
        setStatusColor("#e74c3c") // Red for offline
      })
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>E-Commerce Project</h1>
      <div style={{ ...styles.card, borderColor: statusColor }}>
        <p style={styles.statusText}>
          System Status: <strong style={{ color: statusColor }}>{message}</strong>
        </p>
      </div>
    </div>
  )
}

// Simple CSS-in-JS object for styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7f6',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '20px'
  },
  card: {
    padding: '40px',
    border: '3px solid',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
  },
  statusText: {
    fontSize: '1.2rem',
    margin: 0
  }
}

export default App