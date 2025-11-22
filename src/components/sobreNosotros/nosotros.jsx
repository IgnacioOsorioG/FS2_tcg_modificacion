import React from 'react';
import './nosotros.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const nosotros = () => {
  return (
    

    <div className='card_container'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
      <Card.Body>
        <Card.Title>Ignacio Osorio</Card.Title>
        <Card.Text>
          Fundador y propietario de la tienda. Analista programador y Apasionado por los juegos de cartas y la cultura geek.
          Ignacio@gmail.com
        </Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308460-stock-illustration-unknown-person-silhouette-profile-picture.jpg"/>
      <Card.Body>
        <Card.Title>Cristian Orellana</Card.Title>
        <Card.Text>
          Fundador y copropietario de la tienda. Analista programador y Experto en estrategias de juego y coleccionismo.
          Cristian@gmail.com
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default nosotros
