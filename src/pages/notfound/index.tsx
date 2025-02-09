import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 lg:px-8">
        <section className="text-center flex items-center justify-center flex-col">
          <div className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img src="/images/404.png" alt="Error 404: Page not found" />
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl leading-8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link
              to="/contact-us"
              className="text-sm font-semibold text-gray-900 hover:underline"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
