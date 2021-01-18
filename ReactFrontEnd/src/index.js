import React from 'react';
import ReactDOM from 'react-dom';

import Column from './column';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import Services from './Services';
import './index.css'

class App  extends React.Component{

  constructor(props) {
    super(props);

    this.state = { 
      itemList:[],
      tasks:{
        'task0':{ id:'task0',content:'Item1'},
        'task1':{ id:'task1',content:'Item2'},
        'task2':{ id:'task2',content:'Item3'},
        'task3':{ id:'task3',content:'Item4'},
        'task4':{ id:'task4',content:'Item5'},

    
    },
    columns:{
        'column1':{
            id:'column1',
            title:'To Do List',
            taskIds:['task0','task1','task2','task3','task4'],
        }  ,
    },  
    columnOrder:['column1'],
    };             
  }


  onDragEnd=result=>{
    const { destination, source , draggableId } = result;
    if(!destination){
      return;
    }

    if(
      destination.droppableId=== source.droppableId &&
      destination.index === source.index

    ){
      return;
    }
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index,0,draggableId);

    const newColumn = {
      ...column,
      taskIds:newTaskIds,
    };

    const newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newColumn.id]:newColumn,
      },
    };
     this.setState(newState);

     

    // My code

     let splitString=[]
     let newItems="";

    let newIds= newTaskIds.toString()
    splitString=newIds.split(",")
    var i;
    for (i = 0; i < splitString.length; i++) {
      newItems=newItems+this.state.tasks[splitString[i]].content+","
    }
    newItems = newItems.substring(0, newItems.length - 1);

    Services.createItem(newItems)
    
}
 



  componentDidMount = () => {   

    
    Services.getTasks()       
        .then(data=>{
              this.setState({ 
                itemList:data.data.users                
              });
    
            
        
        let dbContentArray=[]
  
        dbContentArray= this.state.itemList[0].task.split(",");         
    
        this.setState(prevState => ({
          tasks: {
            ...prevState.tasks,           
            task0: {                     
              ...prevState.tasks.task0,   
              content: dbContentArray[0] 
            }
          }
        }))
    
    
        this.setState(prevState => ({
          tasks: {
            ...prevState.tasks,           
            task1: {                     
              ...prevState.tasks.task1,   
              content: dbContentArray[1] 
            }
          }
        }))
    
    
        this.setState(prevState => ({
          tasks: {
            ...prevState.tasks,           
            task2: {                     
              ...prevState.tasks.task2,   
              content: dbContentArray[2] 
            }
          }
        }))
    
    
        this.setState(prevState => ({
          tasks: {
            ...prevState.tasks,           
            task3: {                     
              ...prevState.tasks.task3,   
              content: dbContentArray[3] 
            }
          }
        }))
    
        this.setState(prevState => ({
          tasks: {
            ...prevState.tasks,           
            task4: {                     
              ...prevState.tasks.task4,   
              content: dbContentArray[4] 
            }
          }
        }))
      
      })
      
      
  } 

  



  render(){
    return (

      <div>
        

        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnOrder.map((columnId)=>{
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);    
          return <Column key={column.id} column={column} tasks={tasks} />
        })}
        </DragDropContext>
      </div>
      );
      
  
    }}
ReactDOM.render(<App />,document.getElementById('root'));
