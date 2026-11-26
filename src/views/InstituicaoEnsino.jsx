import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { PlusIcon, MagnifyingGlassIcon, TrashIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

const InstituicaoEnsino = () => {
  const buscarHandleClick = (event) => {};

  const handleClickAdicionarIE = (event) => {
    console.log('Adicionando uma IE');
  };

  const [top10, setTop10] = useState([]);

  async function buscarDadosDaIE() {
    fetch('http://localhost:5000/instituicoesensino')
      .then((api) => api.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : [];
        const organized = [...lista]
          .sort((a, b) => Number(b.QT_MAT_BAS ?? 0) - Number(a.QT_MAT_BAS ?? 0))
          .slice(0, 10);
        return organized;
      })
      .then((organized) => setTop10(organized))
      .catch((e) => console.error('Erro ao carregar dados:', e));
  }

  const handleDeleteIE = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta instituição?')) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/instituicoesensino/${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        buscarDadosDaIE();
      } else {
        console.error('Erro ao deletar na API:', response.status);
      }
    } catch (error) {
      console.error('Erro de conexão ao deletar:', error);
    }
  };

  useEffect(() => {
    buscarDadosDaIE();
  }, []);

  return (
    <>
      {/* Barra de Busca */}
      <Row className="pt-4 mb-4">
        <Col xs="10" lg="10">
          <Form.Control type="text" placeholder="Busca" />
        </Col>
        <Col xs="2" lg="2" className="d-flex gap-2">
          <OverlayTrigger placement="top" overlay={<Tooltip>Buscar</Tooltip>}>
            <Button onClick={buscarHandleClick}>
              <MagnifyingGlassIcon weight="bold" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Adicionar</Tooltip>}
          >
            <Button onClick={handleClickAdicionarIE}>
              <PlusIcon weight="bold" />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>

      {/* Tabela */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Matrículas - Educação Básica</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {top10.map((escola, i) => (
            <tr key={String(escola.id ?? i)}>
              <td>{i + 1}</td>
              <td>{escola.NO_ENTIDADE}</td>
              <td>{escola.NO_MUNICIPIO}</td>
              <td>{escola.NO_UF}</td>
              <td>{Number(escola.QT_MAT_BAS ?? 0)}</td>
              <td className="text-center">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Excluir</Tooltip>}
                >
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteIE(escola.id)}
                  >
                    <TrashIcon weight="bold" />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InstituicaoEnsino;