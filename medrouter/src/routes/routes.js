/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// import ReactGA from 'react-ga';
// import { useSelector } from 'react-redux';

// Import Layouts
// import AdminLayout from '~/components/Layouts/Admin';
import DefaultLayout from '~/components/Layouts/Default';
// import Client from '~/components/Layouts/Client';

import { store } from '~/store/index';

export default function RouterWrapper({
  component: Component,

  ...rest
}) {
  const { signed } = store.getState().auth;

  const Layout = signed ? DefaultLayout : DefaultLayout;

  // GA

  /**

  const trackingId = 'G-CB4KQ4MS85'; // Replace with your Google Analytics tracking ID

  ReactGA.initialize(trackingId);

  ReactGA.set({
    userId: 'teste',
    // any data that is relevant to the user session
    // that you would like to track with google analytics
  });
*/
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouterWrapper.defaultProps = {
  isPrivate: false,
};
