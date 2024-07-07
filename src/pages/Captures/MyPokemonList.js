import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PokeCard from "../../components/Pokemon/PokeCard";
import Footer from "../../components/Others/Footer";
import api2 from "../../services/api2";

function MyPokemonList() {
  const [capturedPokemons, setCapturedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [releaseMessage, setReleaseMessage] = useState("");

  useEffect(() => {
    async function fetchCapturedPokemons() {
      try {
        const response = await api2.get("/myPokemonList");
        setCapturedPokemons(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal memuat data Pokémon yang ditangkap:", error);
        setLoading(false);
      }
    }

    fetchCapturedPokemons();
  }, []);

  async function handleRelease(pokemon) {
    try {
      const response = await api2.delete(`/release/${pokemon.id}`);
      const releaseNumber = response.data.releaseNumber;
      const message = response.data.message;

      if (response.status === 200 && message === 'Pokémon berhasil dilepaskan.') {
        setCapturedPokemons((prevPokemons) =>
          prevPokemons.filter((p) => p.id !== pokemon.id)
        );
      }
      setReleaseMessage(message);
    } catch (error) {
      console.error("Gagal melepaskan Pokémon:", error);
      setReleaseMessage(`Gagal melepaskan ${pokemon.name}. Terjadi kesalahan.`);
    }
    setShowModal(true);
  }

  async function handleRename(pokemon) {
    try {
      const response = await api2.put(`/rename/${pokemon.id}`);
      const newName = response.data.newName;
      
      setCapturedPokemons((prevPokemons) =>
        prevPokemons.map((p) =>
          p.id === pokemon.id ? { ...p, nickname: newName } : p
        )
      );
      setReleaseMessage(`Pokémon berhasil berganti nama menjadi ${newName}`);
    } catch (error) {
      console.error("Gagal mengganti nama Pokémon:", error);
      setReleaseMessage(`Gagal mengganti nama ${pokemon.name}. Terjadi kesalahan.`);
    }
    setShowModal(true);
  }

  return (
    <div>
      <Header />

      <Container fluid>
        <h1 className="text-center text-light mt-5 mb-4">My Pokémon List</h1>
        <Row>
          {loading ? (
            <p className="text-light text-center">Loading...</p>
          ) : capturedPokemons.length === 0 ? (
            <p className="text-light text-center">Anda belum menangkap Pokémon.</p>
          ) : (
            capturedPokemons.map((pokemon) => (
              <Col key={pokemon.id} xs={12} sm={6} lg={3} className="mb-4">
                <PokeCard
                  name={pokemon.nickname || pokemon.name}
                  id={pokemon.id}
                  types={pokemon.type ? [{ slot: 1, type: { name: pokemon.type, url: "" } }] : [{ slot: 1, type: { name: "unknown", url: "" } }]}
                  click={true}
                />
                <div className="text-center mt-2">
                  <Button variant="danger" onClick={() => handleRelease(pokemon)}>
                    Lepaskan
                  </Button>{" "}
                  <Button variant="primary" onClick={() => handleRename(pokemon)}>
                    Rename
                  </Button>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Footer />

      {/* Modal untuk menampilkan pesan pelepasan atau pergantian nama */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Action Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{releaseMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyPokemonList;
