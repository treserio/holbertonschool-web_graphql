import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';
const { graphql } = require('react-apollo');
const { getTasksQuery } = require('../queries/queries');

function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });

  console.log('TaskList props', props);

  function displayTasks() {
    console.log('displayTasks, props.data', props.data);
    var data = props.data;

    if (data.loading) {
      return ( <div> Loading tasks... </div> );
    } else {
      return data.tasks.map(task => {
        return (
          <li
            key = {task.id}
            onClick = {(e) => {
              setState({
                selected: task.id
              });
            }}
          >
            {task.title}
          </li>
        );
      })
    }
  }

  return (
    <div>
      <ul id = "task-list">
        {displayTasks()}
      </ul>
      <TaskDetails taskId={state.selected}/>
    </div>
  );
}

// export default TaskList;
export default graphql(getTasksQuery)(TaskList);
