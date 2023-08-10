package com.example.todoapp.todo;

import java.time.LocalDate;

public record TodoDTO(
        Long id,
        String name,
        LocalDate targetDate,
        boolean completed
){
}
