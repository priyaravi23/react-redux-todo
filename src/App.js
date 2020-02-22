import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import uuid from 'uuid';
import './App.css';
import {dispatchfetchTodos} from "./redux/actions/actions";
import {connect} from 'react-redux';
import Todo from './todo';
import {saveTodo, deleteTodo, deleteAllTodos, fetchTodos, updateTodo} from "./redux/actions/action-utility";

class App extends Component {
  state = {
    todos: [],
    filter: 'all',
    todoText: ''
  };

  componentDidMount() {
    dispatchfetchTodos();
  }

  handleFilterChange = e => {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    this.setState({
      filter
    });
  };

  handleTodoChange = (e) => {
    this.setState({
      todoText: e.target.value
    });
  };

  handleNewTodo = event => {
    if (event.key === "Enter") {
      // Create a todo object
      const todo = {
        id: uuid.v4(),
        value: this.state.todoText,
        complete: false
      };
      this.props.dispatch(
        saveTodo('', todo, () => {
          this.props.dispatch(fetchTodos())
        })
      );
    }
  };

  handleRemove = id => {
    this.props.dispatch(
      deleteTodo(id, undefined, () => {
        // code will be executed if the remove is successful
        this.props.dispatch(fetchTodos())
      })
    );
  };

  clearComplete = () => {
    this.props.dispatch(
      deleteAllTodos(() => {
        this.props.dispatch(fetchTodos)
      })
    );
  };

  markComplete = (e) => {
    let id = e.target.getAttribute('data-id');
    let tempTodos = this.state.todos;

    tempTodos.forEach((todo) => {
      if (id === todo.id) {
        if (todo.complete) {
          todo.complete = false;
        }
        else if (!todo.complete) {
          todo.complete = true;
        }
      }
    });

    this.setState({
      todos: tempTodos
    });
  };

  render() {
    const {todos, fetchInProgress, err} = this.props.todos;
    console.log('props', todos, fetchInProgress, err);
    const {filter} = this.state;
    const renderedTodos = this.renderTodos(todos);
    return (
      <section className="todoapp">

        <header className="header">
          <h1>Todo</h1>
          <input type="text"
                 autoFocus
                 className="new-todo"
                 value={this.state.todoText}
                 placeholder="What needs to be done?"
                 onKeyPress={this.handleNewTodo}
                 onChange={this.handleTodoChange}
          />
        </header>

        <section className="main">
          <ul className={`todo-list ${filter}`}>
            {renderedTodos}
          </ul>
        </section>

        <Router>
          <footer class="footer">
            <span class="todo-count"><strong>{(this.state.todos.filter(todo => !todo.complete)).length}</strong> item left</span>
            <ul class="filters">
              <li>
                <a data-filter="all" href="#" onClick={this.handleFilterChange}>All</a>
              </li>
              <li>
                <a data-filter="active" href="#" onClick={this.handleFilterChange}>Active</a>
              </li>
              <li>
                <a data-filter="complete" href="#" onClick={this.handleFilterChange}>Completed</a>
              </li>
            </ul>
            <button className="clear-completed"
                    onClick={this.clearComplete}> Clear completed
            </button>
          </footer>
        </Router>
      </section>
    );
  }

  renderTodos = todos => {
    return Object.values(todos).map(item => {
      return (
        <li className={item.complete ? "todo completed" : "todo"}>
          <div className="view">
            <input className="toggle"
                   type="checkbox"
                   checked={item.complete}
                   data-id={item.id}
                   onChange={this.markComplete}/>
            <Todo {...item} key={item.id} removeTodo={this.handleRemove}/>
          </div>
        </li>
      );
    })
  };
}

/**
 * @desc Pull out the props from the reducer state that will be
 *   passed along as props to the component.
 * */

const mapStateToProps = ({todos}) => {
  return {
    todos
  }
};

const WrappedAppComponent = connect(mapStateToProps)(App);

export default WrappedAppComponent;
