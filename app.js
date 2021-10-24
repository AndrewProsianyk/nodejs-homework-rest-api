const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// mongoose.connect(DB_HOST, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(async () => {
//   try {
//     const result = await Contact.create(newContact)
//     console.log(result)
//   } catch (error) {
//     console.log(error.message)
//   }
// }).catch(error => {
//   console.log(error.message)
// })
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
