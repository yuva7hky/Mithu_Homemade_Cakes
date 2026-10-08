import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('mhc_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mhc_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, weight, quantity, price) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.weight === weight);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.weight === weight) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, weight, quantity, price }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, weight) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.weight === weight)));
  };

  const updateQuantity = (id, weight, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.weight === weight) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
