import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import Dashboard from '../Dashboard/Dashboard'
import FeedbackView from '../FeedbackView/FeedbackView'
import { getTeammates, getFeedback, getAdditionalInfo } from '../apiCalls';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const updateUser = async user => {
    try {
      const { teammates } = await getTeammates(user.id);
      const { feedback } = await getFeedback(user.id);
      const updatedFeedback = await getAdditionalInfo(feedback);
      setUser({ ...user, team: teammates, feedback: updatedFeedback })
    } catch (e) {
    }
  }
    
  return (
    <div className="App">
      <header>
        <h1>Feedback Loop</h1>
      </header>
      <section className="main">
        <Routes>
        <Route path='/' element={<LoginForm updateUser={updateUser}/>} />
        <Route path='/dashboard' element={<Dashboard {...user} />} />
        <Route path='/feedback/:id' element={<FeedbackView user={user} updateUser={updateUser}/>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
