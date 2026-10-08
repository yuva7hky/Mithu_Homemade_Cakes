import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { generateSingleProductWhatsAppLink, generateCustomizedEnquiryLink } from '../utils/whatsapp';
import { WeightSelector, QuantitySelector } from '../components/Selectors';
import { WhatsAppIcon } from '../components/Icons';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedWeight, setSelectedWeight] = useState(product ? product.availableWeights?.[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate('/');
    } else {
      setSelectedWeight(product.availableWeights?.[0]);
      setQuantity(1);
    }
  }, [product, navigate]);

  if (!product) return null;

  const isCustomized = product.priceOnRequest;
  const multiplier = isCustomized ? 1 : (selectedWeight / 0.5); // Prices in data are for 0.5kg
  const price = isCustomized ? 0 : (product.category === 'brownies' ? product.basePrice : product.basePrice * multiplier);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity, price);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    if (isCustomized) {
      window.open(generateCustomizedEnquiryLink(product), '_blank');
    } else {
      window.open(generateSingleProductWhatsAppLink(product, selectedWeight, quantity, price), '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-textMuted hover:text-primary transition-colors mb-6 sm:mb-8 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="clay-card overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative bg-softPink">
            <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-lightPink text-primary font-bold text-xs rounded-full mb-4 w-fit border border-softPink">
              {product.category.toUpperCase()}
            </span>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-textMain mb-4">{product.name}</h1>
            <p className="text-base sm:text-lg text-textMuted mb-8 leading-relaxed">
              {product.description}
            </p>

            {isCustomized ? (
              <div className="mb-8">
                <p className="text-2xl font-bold text-primary mb-2">Price on Request</p>
                <p className="text-sm text-textMuted">Contact us to discuss your design, flavor, and sizing options for this customized cake.</p>
              </div>
            ) : (
              <div className="space-y-8 mb-10">
                <WeightSelector 
                  category={product.category}
                  availableWeights={product.availableWeights} 
                  selectedWeight={selectedWeight} 
                  onSelect={setSelectedWeight} 
                />
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-softPink">
                  <QuantitySelector 
                    quantity={quantity} 
                    onIncrease={() => setQuantity(q => q + 1)} 
                    onDecrease={() => setQuantity(q => Math.max(1, q - 1))} 
                  />
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-textMuted font-medium mb-1">Total Price</p>
                    <p className="text-3xl font-extrabold text-primary">₹{price * quantity}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              {!isCustomized && (
                <button 
                  onClick={handleAddToCart}
                  className={`clay-button-secondary w-full sm:w-1/2 flex justify-center items-center ${addedAnimation ? 'bg-green-50 text-green-600 border-green-200' : ''}`}
                >
                  {addedAnimation ? (
                    <><CheckCircle2 size={20} className="mr-2" /> Added</>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              )}
              
              <button 
                onClick={handleBuyNow}
                className={`clay-button bg-whatsapp shadow-none hover:shadow-none hover:bg-green-600 w-full flex justify-center items-center ${!isCustomized ? 'sm:w-1/2' : ''}`}
              >
                <WhatsAppIcon size={20} className="mr-2" /> {isCustomized ? 'Get Details on WhatsApp' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
