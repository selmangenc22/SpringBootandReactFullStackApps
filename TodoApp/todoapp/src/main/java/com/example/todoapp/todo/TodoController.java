package com.example.todoapp.todo;

import com.example.todoapp.todo.specification.SearchCriteria;
import com.example.todoapp.todo.specification.TodoSpecification;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/v1/todo")
public class TodoController {
    private final TodoService todoService;

    @GetMapping()
    public ResponseEntity<List<TodoDTO>> getTodos() {
        return ResponseEntity.ok(todoService.getTodo());
    }

    @PostMapping("/filter")
    public ResponseEntity<List<TodoDTO>> getFilteredTodos(@RequestBody SearchCriteria searchCriteria){
        return ResponseEntity.ok(todoService.getTodosBySearchCriteria(searchCriteria));
    }

    @PostMapping
    public ResponseEntity<Todo> registerNewTodo(@RequestBody Todo todo){
        return ResponseEntity.ok(todoService.addNewTodo(todo));
    }

    @DeleteMapping(path = "/{todoId}")
    public void deleteTodo(@PathVariable("todoId") Long todoId){
        todoService.deleteTodo(todoId);
    }

    @PutMapping(path = "/{todoId}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("todoId") Long todoId,
                           @RequestBody Todo todo){
        return ResponseEntity.ok(todoService.updateTodo(todoId, todo.getName(), todo.getTargetDate()));
    }

    @PostMapping(path = "/{todoId}")
    public ResponseEntity<Todo> updateTodoState(@PathVariable("todoId") Long todoId,
                           @RequestParam boolean isCompleted){
        return ResponseEntity.ok(todoService.updateTodoState(todoId, isCompleted));
    }
}
