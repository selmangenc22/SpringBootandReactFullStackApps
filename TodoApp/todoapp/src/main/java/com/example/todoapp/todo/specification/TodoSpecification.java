package com.example.todoapp.todo.specification;

import com.example.todoapp.todo.Todo;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.Objects;
@AllArgsConstructor
public class TodoSpecification implements Specification<Todo>{
    private final SearchCriteria searchCriteria;

    @Override
    public Predicate toPredicate(Root<Todo> root,
                                 CriteriaQuery<?> query, CriteriaBuilder cb) {

        switch(Objects.requireNonNull(
                SearchOperation.getSimpleOperation
                        (searchCriteria.getOperation()))){
            case EQUAL:
                return cb.equal(root.get(searchCriteria.getFilterKey()),
                        searchCriteria.getValue());

            default: return null;
        }
    }
}