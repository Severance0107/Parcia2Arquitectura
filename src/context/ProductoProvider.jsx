import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [producto, setProducto] = useState({
    title: '',
    description:'',
    price: 0,
    image: []
  });
  const [cargando, setCargando] = useState(false);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const { data } = await clienteAxios("/products");

        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductos();
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitProducto = async (producto) => {
    if (producto.id) {
        console.log("Editando")
        setProducto(producto)
        handleShowEdit()
    } else {
        console.log("Creando")
      await nuevoProducto(producto);
    }
  };

  const editarProducto = async (producto) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;


      const { data } = await clienteAxios.put(
        `/products/${producto.id}`,
        producto
      );

      // Sincornizar el state
      const productosActualizados = productos.map((productoState) =>
        productoState.id === data.id ? data : productoState
      );
      setProductos(productosActualizados);

      // Mostrar la alerta
      setAlerta({
        msg: "Producto Acutializado Correctamente",
        error: false,
      });

      console.log("Producto actualizado")

      // Redireccionar      \
      setTimeout(() => {
        setAlerta({});
        navigate("/productos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoProducto = async (producto) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const { data } = await clienteAxios.post("/productos", producto);
      setProductos([...productos, data]);

      setAlerta({
        msg: "Producto Creado Correctamente",
        error: false,
      });
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setAlerta({});
      navigate("/productos");
    }, 3000);
  };

  const obtenerProducto = async (id) => {
    setCargando(true);
    handleShow()
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const { data } = await clienteAxios(`/products/${id}`);
      setProducto(data);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const { data } = await clienteAxios.delete(`/products/${id}`);

      // sincronizar el state
      const productosActualizados = productos.filter(productoState => productoState.id !== id)
      setProductos(productosActualizados)
      
      setAlerta({
        msg: data.msg,
        error: false
      })

      console.log("Producto Eliminado")

      setTimeout(() => {
        setAlerta({});
        navigate("/productos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        alerta,
        mostrarAlerta,
        submitProducto,
        obtenerProducto,
        producto,
        cargando,
        eliminarProducto,
        show, 
        setShow,
        showEdit,
        handleClose,
        handleShow,
        handleCloseEdit,
        handleShowEdit,
        editarProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export { ProductosProvider };

export default ProductosContext;