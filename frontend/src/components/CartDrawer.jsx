import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generateCartWhatsAppLink } from '../utils/whatsapp';
import { WhatsAppIcon } from './Icons';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    const link = generateCartWhatsAppLink(cart, cartTotal);
    window.open(link, '_blank');
    clearCart(); // Optional: clear cart after sending order
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsCartOpen(false)} />
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700">
          <div className="h-full flex flex-col bg-lightPink shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 bg-white border-b border-softPink">
              <h2 className="text-xl font-bold text-primary">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-textMuted hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-24 h-24 bg-softPink rounded-full flex items-center justify-center text-primary opacity-50 mb-4">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-textMain">Your cart is empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="clay-button-secondary text-sm">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.weight}`} className="flex items-center p-3 bg-white rounded-2xl shadow-sm border border-softPink">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-bold text-textMain line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-textMuted mt-1">
                        {item.weight === 0.25 ? '250g' : (item.weight === 1 && item.category === 'treats' ? '1 Pack' : `${item.weight} KG`)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-primary text-sm">₹{item.price * item.quantity}</span>
                        <div className="flex items-center space-x-2 bg-lightPink rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.weight, -1)} className="p-1 text-textMuted hover:text-primary">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.weight, 1)} className="p-1 text-textMuted hover:text-primary">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.weight)}
                      className="ml-2 p-2 text-red-300 hover:text-red-500 transition-colors self-start"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-softPink bg-white p-4 sm:p-6 space-y-4">
                <div className="flex justify-between text-base font-semibold text-textMain">
                  <p>Subtotal</p>
                  <p>₹{cartTotal}</p>
                </div>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center clay-button bg-whatsapp shadow-none hover:shadow-none hover:bg-green-600"
                >
                  <WhatsAppIcon size={20} className="mr-2" /> Order on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
