import React from 'react';
import Head from '../components/head';
import Nav from '../components/nav';
import NProgress from '../components/nprogress';

const Layout = (props) => (
  <>
    <Head title={props.title || 'Home'} />
    <NProgress />
    <Nav
      isAuthenticated={props.isAuthenticated}
      userProfile={props.userProfile}
      width={props.width}
    />
    <div
      className={
        'app ' +
        (props.width && props.width == 'full' ? 'container-fluid' : 'container')
      }
    >
      {props.children}
    </div>

    <style jsx>{`
      :global(body) {
        font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
          Helvetica Neue, sans-serif;
        font-weight: 400 !important;
        line-height: 1.75em !important;
        color: #484848 !important;
        font-size: 16px;
      }

      :global(html) {
        height: 100%;
      }

      :global(body) {
        height: 100%;
      }

      :global(#__next) {
        height: 100%;
        overflow: auto;
      }

      :global(.btn-primary) {
        background: #0055ff;
      }

      .app {
        overflow: hidden;
        min-height: calc(100% - 125px);
      }
    `}</style>
  </>
);

export default Layout;
