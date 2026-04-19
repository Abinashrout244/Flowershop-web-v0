import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen grid place-items-center px-4 text-center">
      <div>
        <h1 className="text-4xl font-semibold">404</h1>
        <p className="mt-2 text-gray-600">Page not found.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-black px-5 py-2 text-white">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
