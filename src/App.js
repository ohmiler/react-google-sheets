// 1. Create google sheets
// 2. Create api with sheet.best
// 3. Coding your program 

import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { Button, Form, Container, Header, Table } from 'semantic-ui-react'
import axios from 'axios'

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [hobby, setHobby] = useState('');
  const [data, setData] = useState(null);

  const userData = {
    name,
    age,
    salary,
    hobby
  }

  const submitHandler = (e) => {
    
    e.preventDefault();
    
    console.log(name, age, salary, hobby);

    axios.post('YOUR_API', userData)
        .then(res => {
          console.log(res);
          alert('Data inserted successfully');
          window.location.reload();
      })

      setName('')
      setAge('')
      setSalary('')
      setHobby('')
  }

  console.log(name, age, salary, hobby);


  useEffect(() => {
    axios('YOUR_API')
          .then(res => setData(res));
    console.log(data);
  }, []);

  if (!data) {
    return <div />;
  }

  return (
    
    <Container className="container">
      <br /><br />
      <Header as="h2">React Google Sheets</Header>  
      <Form className="form" onSubmit={submitHandler}>
        <Form.Field>
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="age">Age</label>
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="salary">Salary</label>
          <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Enter your salary" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="hobby">Hobby</label>
          <input type="text" value={hobby} onChange={(e) => setHobby(e.target.value)} placeholder="Enter your hobby" />
        </Form.Field>

        <Button color="blue"  type="submit">Submit</Button>
      </Form>

      <hr />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Salary</Table.HeaderCell>
            <Table.HeaderCell>Hobby</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.data.map(val => (
            <Table.Row>
              <Table.Cell>{val.name}</Table.Cell>
              <Table.Cell>{val.age}</Table.Cell>
              <Table.Cell>{val.salary}</Table.Cell>
              <Table.Cell>{val.hobby}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
    </Container>
  );
}

export default App;
