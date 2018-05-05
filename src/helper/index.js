/*
 * src/helper/index.js 
**/

export function Err (res) {
  return ({ message, code }) => {
    const data = {
      code,
      error: message
    }
    res.status(400).json(data)
  }
}

export function NotFound (res) {
  return (message) => {
    const data = {
      error: message + " not found."
    }
    res.status(404).json(data)
  }
}

export function Ok (res) {
  return (body) => {
    const data = {
      data: body
    }
    res.status(200).json(data)
  }
}

export function OkCreated (res) {
  return (body) => {
    const data = {
      data: body
    }
    res.status(201).json(data)
  }
}
