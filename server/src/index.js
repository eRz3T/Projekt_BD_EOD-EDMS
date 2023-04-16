const express = require('express')
const cors = require('cors')
const app = express()
const { xss } = require('express-xss-sanitizer')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
require('dotenv').config()

app.use(express.json({ limit: '5MB' })) // pozwala na używanie/wysyłanie JSONów z backendu do frontu i na odwrót
const corsOptions = {
  origin: 'http://localhost:3000', // Dopuszcza zapytania tylko z tego adresu:portu - można usunąć jeśli powoduje błędy
  optionsSuccessStatus: 200,
}
app.use(xss()) // podstawowa zanityzacja przychodzących danych (zabezpieczenie przed xss)
app.use(cors(corsOptions)) // pozwala na wysyłanie zapytań z lokalnego klienta frontend

app.get('/', (req, res) => {
  res.send('Test czy API dziala')
})

// Zarządzanie ścieżkami API (do nich odwołuje się frontend kiedy potrzebuje zapytać o dane lub je wysłać na server)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
