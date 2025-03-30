import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <section className="p-5 rounded-xl shadow-lg flex justify-center items-center w-full bg-card">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center mx-auto">
              <div
                className="h-96 bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                }}
              >
                <h1 className="text-8xl">404</h1>
              </div>

              <div className="mt-[-12px] text-center">
                <h3 className="text-4xl font-bold mb-4">Look like you&apos;re lost</h3>
                <p className="mb-6 text-lg">The page you are looking for is not available!</p>
                <Link href="/" className="text-white bg-green-600 py-2 px-5 rounded hover:bg-green-700">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
