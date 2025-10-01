const Header = (props) => <h2>{props.header}</h2>;

const Content = ({ content }) => {
  return content.map((part) => <Part key={part.id} part={part} />);
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ total }) => <b>total of {total} exercises</b>;

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
      <Total
        total={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </div>
  );
};

export default Course;
