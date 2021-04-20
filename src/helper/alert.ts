import Noty from 'noty';
import { message } from 'antd';
import isYuquePage from './isYuquePage';

function createAlert(type: 'success' | 'error' | 'warning' | 'info', text: string, onClose?: () => void) {
  isYuquePage()
    ? void message[type](text, 3, onClose)
    : new Noty({
        type,
        text,
        timeout: 3000,
        progressBar: false,
        layout: 'topCenter',
        theme: 'bootstrap-v4',
        callbacks: { onClose }
      }).show();
}

const Alert = {
  info: createAlert.bind(null, 'info'),
  error: createAlert.bind(null, 'error'),
  success: createAlert.bind(null, 'success'),
  warning: createAlert.bind(null, 'warning')
};

export default Alert;
