import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {

  useEffect(() => {
    const unlisten = history.listen(() => {
      // return !history.location.pathname === '/exhibitions' && requestCont.scrollTo(0, 0);
      return history.location.pathname === '/exhibitions' ? '' : '';
    });

    return () => {
      unlisten();
    }
  }, []);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);