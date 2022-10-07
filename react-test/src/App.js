import './App.css';
import React, { useState } from 'react';

import Roles from './components/roles'
import Teams from './components/teams'
import People from './components/people'

import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client'


function App() {

  const [menu, setMenu] = useState('Teams')
  //서버가 기동되었을때 가능함
  //GraphQL 서버로와 정보를 주고받을 ApolloClient 객체생성
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

  let mainComp = {
    Roles: (<Roles />),
    Teams: (<Teams />),
    People: (<People />),
  }

  function NavMenus() {
    return [
      'Roles', 'Teams', 'People'
    ].map((_menu, key) => {
      console.log(_menu,key)
      return (
        <li key={key} className={menu === _menu ? 'on' : ''}
          onClick={() => { setMenu(_menu); }}>{_menu}</li>
      );
    });
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>
              {NavMenus()}
            </ul>
          </nav>
        </header>
        <main>
          {mainComp[menu]}
        </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
