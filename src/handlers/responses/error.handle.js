import colors from 'colors'

const handleHTTPError = ({ statusCode = 200, response = {}, data, message = 'Error desconocido' }) => {
  console.log(colors.magenta(`[ ✗ ] ${message}`))
  response.status(statusCode).json({
    status: 'Error',
    data,
    message
  })
}

export default handleHTTPError
