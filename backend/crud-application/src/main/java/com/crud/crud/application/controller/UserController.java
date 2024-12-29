package com.crud.crud.application.controller;

import com.crud.crud.application.exception.UserNotFoundException;
import com.crud.crud.application.model.Note;
import com.crud.crud.application.model.User;
import com.crud.crud.application.repository.NoteRepository;
import com.crud.crud.application.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NoteRepository noteRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);

        }
        userRepository.deleteById(id);
        return "user with id " + id + "has been deleted successfully";

    }

    @PostMapping("/user/{id}/notes")
    public Note addNoteToUser(@PathVariable Long id, @RequestBody Note note) {
        // Fetch the user from the database
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Associate the note with the user
        note.setUser(user);

        // Save the note
        return noteRepository.save(note);
    }

    @GetMapping("/user/{id}/notes")
    public List<Note> getAllNotes(@PathVariable Long id) {
        // Fetch the user by ID
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Return the notes for the user
        return user.getNotes();
    }
}
