import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import ShowNavigationBar from './navBarComponent';

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

function PageRender() {
  return (
    <div>
    <ShowNavigationBar/>
        <Container style = {{marginTop : '50px', display : 'flex', justifyContent : 'space-evenly' }}>
        <DisplayCard/>
        <DisplayCard/>
        <DisplayCard/>
    </Container>
    </div>
  );
}

export default PageRender;