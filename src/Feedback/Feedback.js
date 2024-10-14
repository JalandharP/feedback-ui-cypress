import React from 'react';
import './Feedback.css';

const Feedback = ({ image, name, feedback}) => {
  return (
    <article className="message">
      <img src={image} alt='' />
      <div>
        <p>{name}</p>
        <p>{feedback}</p>
      </div>
    </article>
  )
}

export default Feedback;