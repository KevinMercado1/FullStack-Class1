const UserList = () => {
  const users = [
    { id: 1, name: 'Kevin', anecdotes: ['Anecdote 1', 'Anecdote 2'] },
    { id: 2, name: 'Luz', anecdotes: ['Anecdote 3'] },
  ];
  return (
    <table>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Anecdotes</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.anecdotes.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </table>
  );
};
