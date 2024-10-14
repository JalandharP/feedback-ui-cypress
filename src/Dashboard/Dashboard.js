import React from 'react';
import Teammate from '../Teammate/Teammate';
import Feedback from '../Feedback/Feedback';
import './Dashboard.css';

const Dashboard = ({ team, feedback }) => {
  const userFeedback = feedback && feedback.map(message => {
    return <Feedback key={`feedback-${message.id}`} {...message} />
  })
  const teammates = team && team.map(member => <Teammate key={`teammate-${member.id}`} {...member} />)
  return (
    <section className="dashboard">
      <section className="feedback">
        {userFeedback}
      </section>
      <section className="team">
        <table>
          <thead>
            <tr>
              <th colSpan="1">Profile</th>
              <th colSpan="1">Name</th>
              <th colSpan="1">Email</th>
              <th colSpan="1">Sent</th>
            </tr>
          </thead>
          <tbody>
            {teammates}
          </tbody>
        </table>
      </section>
    </section>
  )
}

export default Dashboard;