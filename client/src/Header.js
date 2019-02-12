import React from 'react';
import SearchField from './SearchField';

const Header = () => 
  <header className="mdl-layout__header ">
  <div className="mdl-layout__header-row">
    <span className="mdl-layout-title">Super Class</span>

    <div className="mdl-layout-spacer"></div>

    <SearchField/>

  </div>
  </header>

export default Header