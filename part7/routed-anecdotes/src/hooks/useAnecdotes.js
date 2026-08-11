import { useEffect, useState } from "react";
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then(setAnecdotes);
  }, []);

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then((created) => {
      setAnecdotes((prev) => prev.concat(created));
    });
  };

  const deleteAnecdote = (id) => {
    anecdoteService.deleteOne(id).then((deleted) => {
      setAnecdotes((prev) => prev.filter(prevOne => prevOne.id !==deleted.id))
    })
  }

  return { anecdotes, addAnecdote, deleteAnecdote };
};