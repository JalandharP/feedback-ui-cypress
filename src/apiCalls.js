export const login = async loginInfo => {
  const url = 'http://localhost:3001/api/v1/login';
  const options = {
    method: 'POST',
    body: JSON.stringify(loginInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error('Email and password do not match.  Please try again.')
  }
  const user = await response.json();
  return user;
}

export const getTeammates = async userId => {
  const url = `http://localhost:3001/api/v1/users/${userId}/teammates`;

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Unable to find user\'s teammates.')
  }
  const user = await response.json();
  return user;
}

export const getFeedback = async userId => {
  const url = `http://localhost:3001/api/v1/users/${userId}/feedback`;

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Unable to find user\'s feedback.')
  }
  const user = await response.json();
  return user;
}

export const getAdditionalInfo = feedback => {
  const additionalInfo = feedback.map(async message => {
    const url = `http://localhost:3001/api/v1/users/${message.senderId}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Unable to find user\'s teammates.')
    }
    const user = await response.json();
    return { ...user, feedback: message.feedback };
  })

  return Promise.all(additionalInfo)
}

export const sendFeedback = async (senderId, receiverId, feedback) => {
  const url = `http://localhost:3001/api/v1/users/${senderId}/feedback/${receiverId}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(feedback),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const { message: errorMsg } = await response.json()
    throw new Error(errorMsg)
  }
}