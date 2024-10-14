import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Teammate.css';
import greenCheck from '../assets/green-check.png'
import redX from '../assets/red-x.png';

const Teammate = ({ email, id, image, name, delivered, history }) => {
  const navigate = useNavigate();
  return (
      <tr className ={!delivered ? "highlight" : ''} onClick={() => {if(!delivered) return navigate(`/feedback/${id}`)}}>
        <td>
          <img className="profile" src={image} alt='' />
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
          <img className="complete" src={delivered ? greenCheck : redX} alt='' />
        </td>
      </tr>
  )
}

export default Teammate;