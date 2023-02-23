import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component.js";
import EditExercise from "./components/edit-exercise.component.js";
import CreateExercise from "./components/create-exercise.component.js";
import CreateUser from "./components/create-user.component.js";
import HomePage from "./components/homepage.component.js"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={< HomePage />} />
        <Route path="/exercises/" exact element={< ExercisesList />} />
        <Route path="/edit/:id" element={< EditExercise />} />
        <Route path="/create" element={< CreateExercise />} />
        <Route path="/user" element={ <CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
