import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  storedTodos = localStorage.getItem("todos")
  constructor() {
    if(!this.storedTodos){
      this.todos = [];
    }else{
      this.todos = JSON.parse(this.storedTodos)
    }
  }

  ngOnInit(): void {}

  deleteTodo(todo:Todo){
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }
  addTodo(todo:Todo){
    console.log(todo);
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos))
  }

}
