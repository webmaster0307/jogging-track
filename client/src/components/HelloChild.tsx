import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from '../interfaces/application.interface';

interface IHelloChildProps {
  pathname: string
  search: string
  hash: string
}

const HelloChild = ({ pathname, search, hash }: IHelloChildProps) => (
  <div>
    Child component for search
    <ul>
      <li><Link to="/hello?color=Blue&size=40">with query string</Link></li>
      <li><Link to="/hello#lovelove">with hash</Link></li>
    </ul>
    <div>
      pathname: {pathname}
    </div>
    <div>
      search: {search}
    </div>
    <div>
      hash: {hash}
    </div>
  </div>
);

const mapStateToProps = (state: IAppState) => ({
  hash: state.router.location.hash,
  pathname: state.router.location.pathname,
  search: state.router.location.search
});

export default connect(mapStateToProps)(HelloChild);
