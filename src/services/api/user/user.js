import api from '../api'

// TO-DO => Refactor async(/user/session)
export const getUser = async() => {
  const user_id = "9d874262-ccd7-41aa-ab38-5446fd164ba3"
  try {
    const response = await api.get(`/user/${user_id}`)
  } catch (error) {
    console.error('Failed to find user! Error:', error)
  }
}

// TO-DO USER ROUTES