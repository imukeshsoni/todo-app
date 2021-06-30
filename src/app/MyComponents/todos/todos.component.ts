import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/Todo';
import { NgxIndexedDBService} from "ngx-indexed-db"

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private dbService: NgxIndexedDBService) {
    dbService.getAll('todos').subscribe( async (todoList:Todo[]) => {
      this.todos = todoList
      console.log("All Todos", todoList)
    })    
  }

  ngOnInit(): void {}

  deleteTodo(todo:Todo){
    const index = this.todos.indexOf(todo);
    this.dbService.deleteByKey('todos', todo.id).subscribe((status) => {
      this.todos.splice(index, 1);
    });
  }
  addTodo(todo:Todo){
    this.dbService
      .addItem('todos', {
        title: todo.title,
        desc: todo.desc,
        active: true,
      })
      .subscribe((item) => {
        this.todos.push(todo);
      });
  }
  toggleTodo(todo:Todo){
    todo.active = !todo.active;
    this.dbService.update('todos', todo).subscribe(todoList => {
      this.todos = todoList
    })
  }

}
