import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <strong>{part.name}</strong>: {part.exerciseCount} exercises <br />
          <em>{part.description}</em>
        </p>
      );
    case 'group':
      return (
        <p>
          <strong>{part.name}</strong>: {part.exerciseCount} exercises <br />
          Group projects: {part.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          <strong>{part.name}</strong>: {part.exerciseCount} exercises <br />
          <em>{part.description}</em> <br />
          Background material: <a href={part.backgroundMaterial}>link</a>
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>{part.name}</strong>: {part.exerciseCount} exercises <br />
          <em>{part.description}</em> <br />
          Requirements: {part.requirements.join(', ')}
        </p>
      );
    default:
      return null;
  }
};

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <p>Total of {totalExercises} exercises</p>;
};

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'A hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
