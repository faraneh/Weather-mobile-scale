import React from 'react';
import './forcastBox.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'



const forcastBox = (props) => {
    return ( 
        <div className="forcastBox">
            <p style={{margin: '15px auto'}}><FontAwesomeIcon icon={faCalendarDay}/> Day</p>
            <p className='forestBoxTemp'>{props.temp}°</p>
            <p className='forestBoxStatus'>{props.weather}</p>
        </div>
     );
}
 
export default forcastBox;