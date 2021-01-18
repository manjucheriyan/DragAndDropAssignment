import React from 'react';
import styled from 'styled-components'; 
import {Droppable} from 'react-beautiful-dnd';
import Task from './task';
import './index.css';


const Container = styled.div`
 margin:28px;
 border:1px solid lightgrey;
 border-radius:21 px;
 background-color:lightgrey;
 margin-right:45px`;

const Title = styled.h3`
padding:8 px;`;
const TaskList = styled.div`
padding:8px;

`;


export default class Column extends React.Component {
        render(){
            return (<Container>
                <Title ><h2 >{this.props.column.title}</h2></Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided)=>(
                <TaskList
                ref={provided.innerRef }
                {...provided.droppableProps} >
                    {this.props.tasks.map((task,index) => (
                <Task key={task.id} task={task} index={index}   />
                ))}
                {provided.placeholder}
                </TaskList>
                    )}
                </Droppable>
                
            </Container>)
            
            
        }}
