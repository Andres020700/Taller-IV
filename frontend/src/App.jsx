import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Badge,
  Alert,
  Spinner,
} from "reactstrap";

function App() {
  const [health, setHealth] = useState(null);
  const [healthError, setHealthError] = useState(false);
  const [info, setInfo] = useState(null);
  const [infoError, setInfoError] = useState(false);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealthError(true));

    fetch("/api/info")
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => setInfoError(true));
  }, []);

  return (
    <Container className="py-4">
      <h1 className="titulo-taller text-center mb-4">Taller IV</h1>

      {/* Ejercicio 4: sección health con h4, p, div, section y CSS */}
      <section className="health-section">
        <div className={healthError ? "health-box health-error" : "health-box"}>
          <h4>Estado del API</h4>
          {healthError ? (
            <p>No se pudo conectar con el API.</p>
          ) : health ? (
            <p>{health.message}</p>
          ) : (
            <p>Verificando...</p>
          )}
        </div>
      </section>

      {/* Ejercicio 5: info con componentes de Reactstrap */}
      <section className="mt-5">
        <h4 className="mb-3">Información de los integrantes</h4>

        {infoError && (
          <Alert color="danger">No se pudo obtener la información del API.</Alert>
        )}
        {!info && !infoError && <Spinner color="primary" />}

        {info && (
          <>
            <Alert color="success">{info.message}</Alert>
            <Row>
              {info.integrantes.map((p, i) => (
                <Col md="6" lg="4" key={p.carnet || i} className="mb-3">
                  <Card className="shadow-sm h-100">
                    <CardBody>
                      <CardTitle tag="h5">Carnet: {p.carnet}</CardTitle>
                      <CardSubtitle className="mb-3 text-muted" tag="h6">
                        {p.carrera}
                      </CardSubtitle>
                      <ListGroup flush>
                        <ListGroupItem>
                          Ciudad de origen:{" "}
                          <Badge color="primary">{p.ciudadOrigen}</Badge>
                        </ListGroupItem>
                        <ListGroupItem>
                          Cantidad de proyectos:{" "}
                          <Badge color="success">{p.cantidadProyectos}</Badge>
                        </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </section>
    </Container>
  );
}

export default App;