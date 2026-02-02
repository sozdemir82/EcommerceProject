import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState("Backend'den haber bekleniyor...")

  useEffect(() => {
    // Flask backend'ine (5000 portu) istek atıyoruz
    axios.get('http://127.0.0.1:5000/')
      .then(response => {
        setMessage(response.data.message)
      })
      .catch(error => {
        console.error("Bağlantı hatası:", error)
        setMessage("Backend'e ulaşılamadı. Flask'ın çalıştığından emin ol!")
      })
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>E-Ticaret Projesi Temeli</h1>
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '10px',
        backgroundColor: '#f9f9f9'
      }}>
        <p>Durum: <strong>{message}</strong></p>
      </div>
    </div>
  )
}

export default App