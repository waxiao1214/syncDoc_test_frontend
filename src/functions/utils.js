export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setId = (id) => {
  localStorage.setItem("user_id", id)
}

export const getId = () => {
  return localStorage.getItem("user_id")
}
