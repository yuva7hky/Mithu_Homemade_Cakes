import { useParams, Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const CategoryPage = () => {
  const { category } = useParams();
  
  const validCategories = ['cakes', 'customized', 'brownies', 'treats'];
  
  if (!validCategories.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  const categoryProducts = products.filter(p => p.category === category);
  
  const categoryTitles = {
    cakes: 'Delicious Cakes',
    customized: 'Customized Cakes',
    brownies: 'Fudgy Brownies',
    treats: 'Sweet Treats'
  };

  const categoryDescriptions = {
    cakes: 'Freshly baked homemade cakes for all your celebrations.',
    customized: 'Special designs for special occasions. Get in touch for customized ideas.',
    brownies: 'Rich, dense, and perfectly baked brownies.',
    treats: 'Small bites of happiness - cookies, cupcakes, and more.'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-textMain mb-4">{categoryTitles[category]}</h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">{categoryDescriptions[category]}</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-softPink">
          <p className="text-xl text-textMuted">Products coming soon to this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
