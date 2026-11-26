import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Carrossel from '../components/Carrossel';
import { useEffect, useState } from 'react';

const Home = () => {
  const [itensCarrossel, setItensCarrossel] = useState([]);
  const [cards, setCards] = useState([]);

  async function buscarDadosDaHome() {
    fetch(
      'http://localhost:5000/itensCarrossel',
    ).then(
      (api) => api.json()
    ).then(
      (data) => setItensCarrossel([...data])
    ).catch(
      (e) => console.error(console.error('Erro ao carregar os dados do carrossel:', e))
    );

    fetch(
      'http://localhost:5000/cards',
    ).then(
      (api) => api.json()
    ).then(
      (data) => setCards([...data])
    ).catch(
      (e) => console.error(console.error('Erro ao carregar os dados dos cards:', e))
    );
  }

  useEffect(() => {
    buscarDadosDaHome();
  }, [])

  return (
    <>
      {/* Carrossel */}
      <Carrossel itensCarrossel={itensCarrossel} />

      {/* Cards */}
      <Container className="mt-4 mb-5">
        <Row>
          {cards.map((card, i) => {
            return (
              <Col key={i} md={4} className="mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={card.srcImagem} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{card.titulo}</Card.Title>
                    <Card.Text>{card.descricao}</Card.Text>
                    <Button
                      href={card.linkBotao}
                      variant="primary"
                      className="mt-auto"
                    >
                      {card.textoBotao}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
