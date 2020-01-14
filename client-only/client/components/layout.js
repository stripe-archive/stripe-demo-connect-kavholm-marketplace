import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import NProgress from "../components/nprogress";

const Layout = props => (
  <>
    <Head title={props.title || "Home"} />
    <NProgress />
    <Nav
      isAuthenticated={props.isAuthenticated}
      userProfile={props.userProfile}
      width={props.width}
    />
    <div
      className={
        "app " +
        (props.width && props.width == "full" ? "container-fluid" : "container")
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

      :global(.splash-image) {
        width: 100%;
        height: 100%;
        position: relative;
        object-fit: cover;
        vertical-align: bottom;
        display: flex;
        align-items: center;

        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0) 50%,
            #ffffff 100%
          ),
          url(https://images.unsplash.com/photo-1542349301445-c5f6ec562729?ixlib=rb-1.2.1&auto=format&fit=crop&w=2315&q=80)
            no-repeat; // Source: https://unsplash.com/photos/wh-7GeXxItI
        background-size: cover;
        background-position: center center;
      }

      :global(#__next) {
        height: 100%;
        overflow: auto;
      }

      :global(.btn-primary) {
        background: #0055ff;
      }

      :global(.btn-secondary) {
        background: #fff;
        border: 2px solid #0055ff;
        color: #0055ff;
      }

      :global(.btn-secondary:hover) {
        background: #0055ff;
        border: 2px solid #0055ff;
        color: #fff;
      }

      :global(.btn-half) {
        display: inline;
        width: 48%;
        margin-right: 16px;
        box-sizing: border-box;
      }

      :global(.btn-half:last-child) {
        margin-right: 0px;
      }

      :global(.btn) {
        font-weight: 600;
        height: 50px;
        border-radius: 8px !important;
        padding: 11px;
      }

      :global(.btn-full) {
        width: 100%;
      }

      :global(button) {
        background-color: #0055ff;
        color: white;
        width: 100%;
        height: 44px;
        font-weight: 500;
        font-size: 17px;
        border-radius: 4px;
        border: 0;
      }

      :global(button:hover) {
        background-color: #0242c3;
        cursor: pointer;
      }

      :global(.popover) {
        padding: 40px;
        position: relative;
        top: -50px;
        width: 500px;
        max-width: 500px;
        background: #ffffff;
        border: 0;
        box-shadow: 0 15px 35px 0 rgba(50, 50, 93, 0.1),
          0 5px 15px 0 rgba(0, 0, 0, 0.07);
        border-radius: 8px;
      }

      :global(h1) {
        font-size: 28px;
        font-weight: 600;
        color: #202020;
        width: 70%;
        margin-bottom: 8px;
      }

      :global(.supporting-text) {
        font-size: 16px;
        margin-bottom: 24px;
      }
      :global(input) {
        border: 1px solid rgb(229, 229, 229);
        border-radius: 8px;
        margin-right: 16px;
        padding: 0 12px 0 40px;
        display: block;
        margin-bottom: 16px;
        width: 100%;
        padding: 12px 48px;
        font-size: 16px;
      }

      :global(select) {
        border: 1px solid rgb(229, 229, 229);
        border-radius: 8px;
        margin-right: 16px;
        display: block;
        margin-bottom: 16px;
        width: 100%;
        padding: 12px 48px;
        appearance: none;
        font-size: 16px;
        color: #757575;
      }

      :global(.right) {
        margin-right: 0px;
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
