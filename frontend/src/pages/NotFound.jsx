import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-softPink mb-4">404</h1>
        <h2 className="text-3xl font-bold text-textMain mb-4">Oops! Page not found.</h2>
        <p className="text-lg text-textMuted mb-8 max-w-md mx-auto">
          Looks like you're lost! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="clay-button inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
