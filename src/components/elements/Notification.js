import React from 'react';
import 'rc-notification/assets/index.css';
import Notification from 'rc-notification';
import iconSuccess from '../../assets/img/success.svg';
import iconWarning from '../../assets/img/warning.png';
import { checkDevice } from './utils';

let notification = null;

const alertCus = e => {
  const alert = document.createElement('div');
  alert.className = 'alert';
  alert.innerText = e;
  document.body.appendChild(alert);
  setTimeout(() => {
    document.body.removeChild(alert);
  }, 3e3);
};

Notification.newInstance({}, n => {
  notification || (notification = n);
});

const notifi = {
  info(e) {
    checkDevice.isMobile()
      ? alertCus(e)
      : notification.notice({
          content: (
            <span className="notification">
              <img src={iconSuccess} alt="" />
              {e}
            </span>
          ),
        });
  },
  warn(e) {
    checkDevice.isMobile()
      ? alertCus(e)
      : notification.notice({
          duration: 5,
          content: (
            <span className="notification">
              <img src={iconWarning} alt="" />
              {e}
            </span>
          ),
        });
  },
};

export default notifi;
