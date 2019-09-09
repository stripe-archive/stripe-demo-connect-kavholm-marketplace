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
      hideBooking={props.hideBooking}
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
        font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue,
          sans-serif;
        line-height: 1.75em !important;
        color: #484848 !important;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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

      :global(.btn) {
        font-weight: 600;
        border-radius: 6px !important;
      }

      :global(.ReactModal__Overlay) {
        opacity: 0;
        transition: opacity 200ms ease;
      }

      :global(.ReactModal__Overlay--after-open) {
        opacity: 1;
      }

      :global(.ReactModal__Overlay--before-close) {
        opacity: 0;
      }

      :global(.ReactModal__Content) {
        opacity: 0;
        transform: translate(0, 16px) scale(0.98);
        transition: opacity 200ms ease, transform 200ms ease;
      }

      :global(.ReactModal__Content--after-open) {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }

      :global(.ReactModal__Content--before-close) {
        opacity: 0;
        transform: translate(0, 16px) scale(0.98);
      }

      .app {
        overflow: hidden;
        min-height: calc(100% - 125px);
      }
    `}</style>
  </>
);

export default Layout;
