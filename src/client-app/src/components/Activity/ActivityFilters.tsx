import React, { Fragment } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';

const ActivityFilters:React.FC<{
    predicate: Map<any,any>
    ,setPredicate: (predicate: string, value: string | Date) => void
}> = ({
    predicate
    ,setPredicate    
}) => {
    return (
  <Fragment>
    <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
      <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
      <Menu.Item 
         active={predicate.size === 0}
         onClick={()=> setPredicate('all','true')}
         color={'blue'} 
         name={'all'} 
         content={'All Activities'}  
       />
        <Menu.Item 
         active={predicate.has('isGoing')}
         onClick={()=> setPredicate('isGoing','true')}
         color={'blue'} 
         name={'all'} 
         content={"I'm Going"}  
       />      
       <Menu.Item 
         active={predicate.has('isHost')}
         onClick={()=> setPredicate('isHost','true')}
         color={'blue'} 
         name={'all'} 
         content={"I'm Hosting"}  
       />         
    </Menu>
    <Header icon={'calendar'} attached color={'teal'} content={'Select Date'} />
    <Calendar 
        onChange={(date)=> setPredicate('startDate', date!) }
        value={predicate.get('startDate') || new Date()}/>
  </Fragment>);
};

export default ActivityFilters;