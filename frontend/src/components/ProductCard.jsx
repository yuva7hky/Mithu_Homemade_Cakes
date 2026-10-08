import { Link } from 'react-router-dom';
import { generateCustomizedEnquiryLink } from '../utils/whatsapp';

const ProductCard = ({ product }) => {
  const isCustomized = product.priceOnRequest;

  const handleCustomEnquiry = (e) => {
    e.preventDefault();
    const link = generateCustomizedEnquiryLink(product);
    window.open(link, '_blank');
  };

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="clay-card h-full flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-softPink">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {product.category.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-textMain mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-textMuted line-clamp-2 mb-4 flex-grow">{product.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-softPink">
            {isCustomized ? (
              <span className="font-semibold text-primary text-sm">Price on Request</span>
            ) : (
              <div className="flex flex-col">
                <span className="text-[10px] text-textMuted uppercase font-semibold">Starts from</span>
                <span className="font-bold text-primary text-lg">₹{product.basePrice}</span>
              </div>
            )}
            
            {isCustomized ? (
              <button 
                onClick={handleCustomEnquiry}
                className="bg-whatsapp text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-green-600 transition-colors shadow-sm flex items-center"
              >
                Get Details
              </button>
            ) : (
              <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold group-hover:bg-primary group-hover:text-white transition-colors">
                View
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
