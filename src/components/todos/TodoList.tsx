import React from 'react';
import { useTodos } from '../../contexts/TodoContext';
import type { TodoType } from '../../types/TodoType';
import TodoItem from './TodoItem';

type TodoListProps = {};

const TodoList = ({}: TodoListProps): JSX.Element => {
  // Context 를 사용함
  const { todos } = useTodos();
  return (
    <div>
      <h2>TodoList</h2>
      <ul>
        {todos.map((item: TodoType) => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
