package com.example.todoapp.todo;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TodoDTOMapper{
    public TodoDTO toTodoDTO(Todo todo);
    public Todo toTodo(TodoDTO todoDTO);
}
