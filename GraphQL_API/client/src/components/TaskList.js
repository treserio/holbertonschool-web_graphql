import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';
const { gql } = require('apollo-boost');
const { graphql } = require('react-apollo');



function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });

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

const getTasksQuery = gql`
{
  tasks {
    id
    title
  }
}
`

// export default TaskList;
export default graphql(getTasksQuery)(TaskList);
