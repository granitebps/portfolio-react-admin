import React, { useEffect } from 'react';
import Router from './Router';
import './components/@vuexy/rippleButton/RippleButton';
import Spinner from './components/@vuexy/spinner/Fallback-spinner';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/plugins/extensions/toastr.scss';
import { useAuthContext } from './contexts/AuthContext';

const App = () => {
  const { state, initialAuth } = useAuthContext();

  useEffect(() => {
    const getAuth = async () => {
      await initialAuth();
    };
    getAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.loading) {
    return <Spinner color="primary" />;
  }

  return <Router />;
};

export default App;
