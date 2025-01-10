import React from 'react';
import { useField } from '../hooks';
const CreateNew = ({ addNew }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    content.reset('');
    author.reset('');
    info.reset('');
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...content} />
        </div>
        <div>
          Author:
          <input {...author} />
        </div>
        <div>
          URL for more info:
          <input {...info} />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateNew;
