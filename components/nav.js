import React from 'react';
import Link from 'next/link';

const links = [
  {href: 'https://github.com/segmentio/create-next-app', label: 'Github'},
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <ul>
      <li>
        <img className="logo" src="/static/logo.svg" />

        <div className="inputs">
          <div className="fake-input">
            <img src="/static/search.svg" />
            <span className="city">Paris</span>
          </div>

          <div className="fake-input">
            <img src="/static/cal.svg" />
            <span>Aug 18 – 25</span>
          </div>

          <div className="fake-input">
            <img src="/static/people.svg" />
            <span>3 guests</span>
          </div>
        </div>
      </li>
      <div className="avatar">
        <img src="/static/avatar.png" height="42" />
      </div>
    </ul>

    <style jsx>{`
      h1 {
        margin: 0;
      }
      .inputs {
        display: flex;
        height: 36px;
      }
      .inputs div {
        margin-right: 12px;
      }
      .fake-input {
        color: #939393;
        padding-right: 40px;
        padding-left: 10px;
        border: 1px solid #dfdfdf;
        border-radius: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        display: flex;
        align-items: center;
      }
      .fake-input span {
        font-weight: 200;
        padding-left: 8px;
      }
      .fake-input .city {
        padding-right: 110px;
      }

      .logo {
        padding-right: 42px;
      }

      :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
        max-width: 1200px;
        margin: auto;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
      }

      li {
        display: flex;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
