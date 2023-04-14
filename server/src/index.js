const express = require('express')
const app = express()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
require('dotenv').config()

app.use(express.json()) // pozwala na używanie/wysyłanie JSONów z backendu do frontu i na odwrót
app.get('/', (req, res) => {
  res.send('Test czy API dziala')
})

// Zarządzanie ścieżkami API (do nich odwołuje się frontend kiedy potrzebuje zapytać o dane lub je wysłać na server)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
