import React, { Component } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";


const API_URL = "http://localhost:8000/api/productos/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false,
      error: "",

      descripcion: "",
      precio: "",
      mensaje: "",
    };
  }


  componentDidMount() {
    this.cargarProductos();
  }

  cargarProductos = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const prod = await respuesta.json();
      this.setState({
        productos: prod,
        recuperado: true,
        error: "",
      });
    } catch (e) {
      this.setState({
        recuperado: true,
        error: "No se pudo conectar con el servicio Web (¿está corriendo Django?)",
      });
    }
  };

 
  manejarCambio = (evento) => {
    this.setState({ [evento.target.name]: evento.target.value });
  };

  // Evento onSubmit: envía el nuevo producto al servicio Web (POST)
  agregarProducto = async (evento) => {
    evento.preventDefault();
    const { descripcion, precio } = this.state;

    try {
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion: descripcion,
          precio: parseFloat(precio),
        }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        this.setState({ error: datos.error || "No se pudo agregar", mensaje: "" });
        return;
      }

      this.setState((estadoPrevio) => ({
        productos: [...estadoPrevio.productos, datos],
        descripcion: "",
        precio: "",
        error: "",
        mensaje: `Producto "${datos.descripcion}" agregado correctamente`,
      }));
    } catch (e) {
      this.setState({ error: "No se pudo conectar con el servicio Web", mensaje: "" });
    }
  };


  mostrarFormulario() {
    const { descripcion, precio } = this.state;
    const incompleto = descripcion.trim() === "" || precio === "";

    return (
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Agregar nuevo producto
        </Typography>
        <Box
          component="form"
          onSubmit={this.agregarProducto}
          sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}
        >
          <TextField
            label="Descripción"
            name="descripcion"
            value={descripcion}
            onChange={this.manejarCambio}
            size="small"
          />
          <TextField
            label="Precio"
            name="precio"
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            value={precio}
            onChange={this.manejarCambio}
            size="small"
          />
          <Button type="submit" variant="contained" disabled={incompleto}>
            Agregar
          </Button>
        </Box>
      </Paper>
    );
  }

 
  mostrarTabla() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Código</b>
              </TableCell>
              <TableCell>
                <b>Descripción</b>
              </TableCell>
              <TableCell align="right">
                <b>Precio</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.productos.map((art) => (
              <TableRow key={art.codigo}>
                <TableCell>{art.codigo}</TableCell>
                <TableCell>{art.descripcion}</TableCell>
                <TableCell align="right">S/ {Number(art.precio).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


  render() {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Listado de productos
        </Typography>

        {this.state.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {this.state.error}
          </Alert>
        )}
        {this.state.mensaje && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {this.state.mensaje}
          </Alert>
        )}

        {this.state.recuperado ? (
          <>
            {this.mostrarFormulario()}
            {this.mostrarTabla()}
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={24} />
            <div>recuperando datos...</div>
          </Box>
        )}
      </Container>
    );
  }
}

export default App;
