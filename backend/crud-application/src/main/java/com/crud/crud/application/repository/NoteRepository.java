package com.crud.crud.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crud.crud.application.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
