import React from 'react';
import Auth from './Auth';
import TodoList from './TodoList';

const App = () => {
  return (
    <Auth>
      <TodoList />
    </Auth>
  );
};

export default App;