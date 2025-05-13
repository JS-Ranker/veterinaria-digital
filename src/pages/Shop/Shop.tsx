import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaTimes,
  FaPlus,
  FaMinus,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Shop.module.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Shop = () => {
  // Estado para los productos
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para el carrito
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Cargar productos (simulando una API)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulando un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Productos de ejemplo para una veterinaria
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Alimento Premium para Perros",
            description: "Alimento balanceado para perros adultos, 20kg",
            price: 24990,
            category: "alimentos",
            image:
              "https://cdnx.jumpseller.com/la-mascota/image/30526514/resize/719/719?1672160403",
          },
          {
            id: 2,
            name: "Alimento para Gatos",
            description: "Alimento para gatos, 1,8kg",
            price: 17990,
            category: "alimentos",
            image:
              "https://cdnx.jumpseller.com/la-mascota/image/20027668/resize/1438/1438?1634602716",
          },
          {
            id: 3,
            name: "Cama para Mascotas",
            description: "Cama suave y cómoda para perros y gatos",
            price: 29990,
            category: "accesorios",
            image:
              "https://www.clubdeperrosygatos.cl/wp-content/uploads/2024/05/CAMA-OXFORD-VERDEE-1.webp",
          },
          {
            id: 4,
            name: "Juguete para Perros",
            description: "Juguete Loro Textil Repelente al Agua",
            price: 6990,
            category: "juguetes",
            image:
              "https://cdnx.jumpseller.com/la-mascota/image/26617505/resize/1438/1438?1661468295",
          },
          {
            id: 5,
            name: "Correa Retráctil",
            description: "Correa retráctil de 5 metros con agarre ergonómico",
            price: 12990,
            category: "accesorios",
            image:
              "https://m.media-amazon.com/images/I/61hCdJf89wL._AC_SX679_.jpg",
          },
          {
            id: 6,
            name: "Shampoo para Mascotas",
            description: "Shampoo hipoalergénico para perros y gatos",
            price: 7990,
            category: "higiene",
            image:
              "https://cdnx.jumpseller.com/la-mascota/image/51257344/resize/1438/1438?1722301141",
          },
          {
            id: 7,
            name: "Arnés Ajustable",
            description: "Arnés reflectante con ajuste seguro",
            price: 14990,
            category: "accesorios",
            image:
              "https://cdnx.jumpseller.com/la-mascota/image/25932784/resize/1438/1438?1658960803",
          },
          {
            id: 8,
            name: "Snacks para Perros",
            description: "Snacks naturales para entrenamiento, 200g",
            price: 4990,
            category: "alimentos",
            image:
              "https://cdnx.jumpseller.com/la-mascota/image/46715568/resize/1438/1438?1710879389",
          },
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según búsqueda y categoría
  useEffect(() => {
    let result = products;

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Actualizar cantidad de un producto en el carrito
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calcular total del carrito
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Categorías disponibles
  const categories = [
    { value: "all", label: "Todos los productos" },
    { value: "alimentos", label: "Alimentos" },
    { value: "accesorios", label: "Accesorios" },
    { value: "juguetes", label: "Juguetes" },
    { value: "higiene", label: "Higiene" },
  ];

  return (
    <div className={styles.shopContainer}>
      <div className={styles.shopHeader}>
        <Link to="/" className={styles.backLink}>
          <FaArrowLeft /> <span>Volver</span>
        </Link>
        <h1 className={styles.shopTitle}>Tienda HappyPet</h1>
        <button
          className={styles.cartButton}
          onClick={() => setIsCartOpen(true)}
        >
          <FaShoppingCart />
          <span>Carrito</span>
          {cart.length > 0 && (
            <span className={styles.cartCount}>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Controles de búsqueda y filtro */}
      <div className={styles.shopControls}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className={styles.filterSelect}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div>Cargando productos...</div>
      ) : filteredProducts.length === 0 ? (
        <div>No se encontraron productos.</div>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.productPrice}>
                  ${product.price.toLocaleString("es-CL")}
                </div>
                <div className={styles.productActions}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => {
                        const cartItem = cart.find(
                          (item) => item.id === product.id
                        );
                        if (cartItem) {
                          updateQuantity(product.id, cartItem.quantity - 1);
                        }
                      }}
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.quantityDisplay}>
                      {cart.find((item) => item.id === product.id)?.quantity ||
                        0}
                    </span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => addToCart(product)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => addToCart(product)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal del carrito */}
      <div
        className={`${styles.cartModalOverlay} ${
          isCartOpen ? styles.open : ""
        }`}
      >
        <div className={styles.cartModal}>
          <div className={styles.cartHeader}>
            <h2 className={styles.cartTitle}>Tu Carrito</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsCartOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className={styles.cartItems}>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <h3 className={styles.cartItemName}>{item.name}</h3>
                    <p className={styles.cartItemPrice}>
                      ${item.price.toLocaleString("es-CL")} x {item.quantity} =
                      ${(item.price * item.quantity).toLocaleString("es-CL")}
                    </p>
                    <div className={styles.cartItemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <span className={styles.quantityDisplay}>
                          {item.quantity}
                        </span>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        className={styles.removeItemButton}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>${cartTotal.toLocaleString("es-CL")}</span>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={() => {
                  alert(
                    "¡Compra realizada con éxito! Gracias por tu compra en HappyPet."
                  );
                  setCart([]);
                  setIsCartOpen(false);
                }}
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
