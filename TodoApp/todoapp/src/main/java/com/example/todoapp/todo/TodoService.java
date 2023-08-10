package com.example.todoapp.todo;

import com.example.todoapp.todo.specification.SearchCriteria;
import com.example.todoapp.todo.specification.TodoSpecification;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.mapstruct.ap.internal.processor.MapperServiceProcessor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;
    private final TodoDTOMapper todoDTOMapper;

    public List<TodoDTO> getTodo(){


        return todoRepository.findAll()
                .stream()
                .map(todo -> todoDTOMapper.toTodoDTO(todo))
                .collect(Collectors.toList());
    }
    public List<TodoDTO> getTodosBySearchCriteria(SearchCriteria searchCriteria) {
        Specification<Todo> spec = new TodoSpecification(searchCriteria);

        return todoRepository.findAll(spec)
                .stream()
                .map(todo -> todoDTOMapper.toTodoDTO(todo))
                .collect(Collectors.toList());
    }

    public Todo addNewTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long todoId) {
        boolean exists = todoRepository.existsById(todoId);
        if(!exists){
            throw new IllegalStateException("todo with id " + todoId + " does not exists");
        }
        todoRepository.deleteById(todoId);
    }

    @Transactional
    public Todo updateTodo(Long todoId, String name, LocalDate targetDate) {
        // Attribute Update
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalStateException((
                        "todo with id " + todoId + " does not exists")));
        if(name != null && name.length() > 0 && !Objects.equals(todo.getName(), name)){
            todo.setName(name);
        }

        if(targetDate != null && !Objects.equals(todo.getTargetDate(), targetDate)){
            todo.setTargetDate(targetDate);
        }

        return todo;
    }
    @Transactional
    public Todo updateTodoState(Long todoId, boolean isCompleted) {
        // State Update
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalStateException((
                        "todo with id " + todoId + " does not exists")));

        todo.setCompleted(isCompleted);

        return todo;
    }
}