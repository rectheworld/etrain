import React from 'react';
import PropTypes from "prop-types";

import Styles from "./Styles/ConnectionItem.module.css"

function ConnectionItem(props) {
  return (
  <div className={Styles['conn-item']}>

    {props.status === 'clicked' ?
    <a className={Styles['conn-link-clicked']}
    href= {`https://www.linkedin.com/in/${props.linkedin}`}
    target='_blank' rel='noreferrer'>
      {props.first_name} {props.last_name}
    </a>
    :

    <a className={Styles['conn-link-click']}
    href= {`https://www.linkedin.com/in/${props.linkedin}`}
    target='_blank' rel='noreferrer'>
      {props.first_name} {props.last_name}
    </a>

    }

    <div className={Styles['status-btn-box']}>
      <button className={props.status !== 'clicked'? Styles['status-btn']: Styles['clicked-status-btn']} onClick={() => {props.updateConnectionStatus(props.target_id, 'friended')}}> Friended</button>
      <button className={props.status !== 'clicked'? Styles['status-btn']: Styles['clicked-status-btn']} onClick={() => {props.updateConnectionStatus(props.target_id, 'endorsed')}}> Endorsed</button>
    </div>

  </div>
  );
}

ConnectionItem.propTypes = {
  target_id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  updateConnectionStatus: PropTypes.func.isRequired
}

export default ConnectionItem;