# Laboratorio N° 10 – Componentes y Eventos

**Alumno:** Gavidia Pérez Deybi · **Grupo:** C24-A · **Docente:** Jorge Ventura Gonzales

Aplicación con **Django** (servicio Web) y **ReactJS + Material-UI** (cliente).

```
lab10/
├── backend/    -> servicio Web en Django (API de productos + CORS)
└── frontend/   -> aplicación React con Material-UI
```

## 1. Backend (Django)

```bash
cd backend
pip install -r requirements.txt     # Django + django-cors-headers
python manage.py migrate            # crea la BD y carga Coca cola y Fanta
python manage.py runserver          # http://localhost:8000
```

Endpoint: `http://localhost:8000/api/productos/`

| Método | Descripción | Cuerpo |
|--------|-------------|--------|
| GET    | Lista de productos | – |
| POST   | Agrega un producto | `{"descripcion": "Inca Kola", "precio": 2.5}` |

Respuesta del GET:

```json
[
  { "codigo": 1, "descripcion": "Coca cola", "precio": 2.33 },
  { "codigo": 2, "descripcion": "Fanta", "precio": 1.7 }
]
```

CORS (`config/settings.py`): se agregó `corsheaders` en `INSTALLED_APPS`,
`corsheaders.middleware.CorsMiddleware` en `MIDDLEWARE` y `CORS_ORIGIN_ALLOW_ALL = True`.

## 2. Frontend (React)

Requiere Node.js. Con el backend encendido:

```bash
cd frontend
npm install
npm start                           # http://localhost:3000
```

> La guía indica `create-react-app lab10`; aquí el proyecto ya viene creado
> con la misma estructura (carpeta `frontend`), solo falta `npm install`.

### Qué incluye `src/App.js`

- Constructor con `state = { productos: [], recuperado: false }`.
- Carga de datos desde Django al montar el componente y `setState({ productos, recuperado: true })`.
  (Se usa `componentDidMount`, porque `componentWillMount` está obsoleto.)
- Método `mostrarTabla()` y `render()` que muestra la tabla o el mensaje "recuperando datos...".
- **Tarea 1 – Material-UI:** `Table`, `TextField`, `Button`, `Alert`, `Container`, `CircularProgress`.
- **Tarea 2 – Agregar datos:** formulario con componentes controlados (`onChange`) y
  envío con `onSubmit` que hace `POST` a Django y actualiza la tabla.

## 3. Pendiente para la entrega (lo hace el alumno)

- Capturas del código y de la ejecución en el informe.
- Subir esta carpeta a un repositorio público de GitHub y pegar el enlace.
- Grabar el video explicando código y ejecución (máx. 4 min).
