const express = require('express')
const cors = require('cors')
const app = express()
const { xss } = require('express-xss-sanitizer')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const casesRoutes = require('./routes/cases')
const caseTransitionsRoutes = require('./routes/caseTransitions')
const commentsRoutes = require('./routes/comments')
const filesRoutes = require('./routes/files')
const workflowRoutes = require('./routes/workflow')
const workflowStepRoutes = require('./routes/workflowStep')
const workflowCategoryRoutes = require('./routes/workflowCategory')

require('dotenv').config()

const corsOptions = {
  origin: 'http://localhost:3000', // Dopuszcza zapytania tylko z tego adresu:portu - można usunąć jeśli powoduje błędy
  optionsSuccessStatus: 200,
}
app.use(xss()) // podstawowa zanityzacja przychodzących danych (zabezpieczenie przed xss)
app.use(cors(corsOptions)) // pozwala na wysyłanie zapytań z lokalnego klienta frontend
app.use(express.json({ limit: '10MB' })) // pozwala na używanie/wysyłanie JSONów z backendu do frontu i na odwrót
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Test czy API dziala')
})

// Zarządzanie ścieżkami API (do nich odwołuje się frontend kiedy potrzebuje zapytać o dane lub je wysłać na server)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cases', casesRoutes)
app.use('/api/caseTransitions', caseTransitionsRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/files', filesRoutes)
app.use('/api/workflows', workflowRoutes)
app.use('/api/workflow-step', workflowStepRoutes)
app.use('/api/workflow-categories', workflowCategoryRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
