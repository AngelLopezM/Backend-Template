import colors from 'colors'

const handleHTTPSuccess = ({ statusCode = 200, response = {}, data = {}, message = '' }) => {
  console.log(colors.green(`[ ✔︎ ] [${statusCode}]`))
  response.status(statusCode).json({
    status: 'Success',
    data,
    message
  })
}

export default handleHTTPSuccess
