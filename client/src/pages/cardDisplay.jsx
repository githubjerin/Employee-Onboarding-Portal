import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ShowNavigationBar from './navBarComponent';
import ListGroup from 'react-bootstrap/ListGroup';
import bg from '../res/images/bg.jpg';

function DisplayCard(){

    return<Card style={{ width: '18rem'}}>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>
}

function ListGroupExample() {
    return (
      <Card style={{ width: '10rem', textAlign : 'center'}}>
        <ListGroup variant="flush">
          <ListGroup.Item>Employees Count</ListGroup.Item>
          <ListGroup.Item>72</ListGroup.Item>
        </ListGroup>
      </Card>
    );
}
 
  
function PageRender() {
  return (
    <div style = {{backgroundImage : `url(${bg})` , backgroundSize : 'cover' }}>
    <ShowNavigationBar/>
    <Container style = {{marginTop : '50px', display : 'flex', justifyContent : 'space-around' }}><ListGroupExample/><ListGroupExample/><ListGroupExample/></Container>
        <Container style = {{marginTop : '50px', display : 'flex', justifyContent : 'space-around' }}>
        <DisplayCard/>
        <DisplayCard/>
        <DisplayCard/>
        <DisplayCard/>
    </Container>
    </div>
  );
}

export default PageRender;