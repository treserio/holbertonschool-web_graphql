import {
  useState,
  //useEffect
} from "react";
const { gql } = require('apollo-boost');
const { graphql } = require('react-apollo');
// components
import TaskDetails from './TaskDetails';

function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });

  const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
  `
  console.log(props);

  return (
    <div>
      <ul id = "task-list" >
        {}
      </ul>
      <TaskDetails />
    </div>
  );
}

// export default TaskList;
export default graphql(getTasksQuery)(TaskList);
