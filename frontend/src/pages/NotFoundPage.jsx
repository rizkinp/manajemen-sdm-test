import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="text-xl mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="mt-6 inline-block text-lg bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;