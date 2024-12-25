import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Our Story */}
      <section className="py-16 px-6 sm:px-12 ">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
            RepZo's Story
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            RepZo was founded in 2024 by Md Abrar Haider with a shared vision of
            simplifying the invoicing process for businesses of all sizes. After
            witnessing the inefficiencies of traditional invoicing systems, we
            set out to create an intuitive and secure platform that would
            streamline financial management for businesses. Today, we are proud
            to serve thousands of businesses around the world.
          </p>
        </div>
      </section>
      <div className=" flex flex-col bg-gray-50">
        {/* Main Section */}
        <section className="py-16 px-6 sm:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Our Mission */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Mission
              </h2>
              <p className="text-gray-600 text-base">
                Our mission is to make invoicing easy and efficient for
                businesses of all sizes, providing tools that help you manage
                and track your finances without the administrative burden.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Vision
              </h2>
              <p className="text-gray-600 text-base">
                We aim to become the go-to platform for automated invoicing,
                offering businesses a simple and secure way to manage finances
                and streamline operations globally.
              </p>
            </div>

            {/* Our Values */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Values
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 text-base">
                <li>
                  <strong>Integrity:</strong> We value transparency and honesty
                  in all our interactions.
                </li>
                <li>
                  <strong>Innovation:</strong> Continuously improving our
                  platform to meet customer needs.
                </li>
                <li>
                  <strong>Customer-Centric:</strong> Our users' success is our
                  priority, always.
                </li>
                <li>
                  <strong>Security:</strong> Protecting our users' data with the
                  highest security standards.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our team is composed of talented individuals from diverse
              backgrounds, all committed to delivering the best invoicing
              solution. From development to customer service, every team member
              plays a crucial role in making InvoiceApp a success.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="https://i.ibb.co.com/V2mG7MK/A3-B59-F1-A-908-B-47-B6-9-F18-19-C100545-D98.png"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  Md Abrar Haider
                </h3>
                <p className="text-base text-gray-600">CEO & Founder</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="https://i.ibb.co.com/sQ1Gch4/photo-1633332755192-727a05c4013d.jpg"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  Taisir Ahmed
                </h3>
                <p className="text-base text-gray-600">Product Manager</p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="https://i.ibb.co.com/3cWQK9Y/istockphoto-805012064-612x612.jpg"
                  alt="Team Member"
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  Rabin Chowdhury
                </h3>
                <p className="text-base text-gray-600">Lead Developer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 px-6 sm:px-12 bg-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
              Our Technology Stack
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              At InvoiceApp, we leverage the latest technologies to provide a
              fast, reliable, and secure platform for our users. Here are some
              of the core technologies that power our platform:
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ">
                <img
                  src="https://i.ibb.co.com/GHkChBv/reactjs-javascript-library-atom-atomic-react-512.webp"
                  alt="React"
                  className="w-12 h-12"
                />
                <p className="ml-1 text-sm lg:text-lg text-gray-800">React</p>
              </div>
              <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="https://i.ibb.co.com/x3B8N2f/nodejs-45adbe594d.png"
                  alt="Node.js"
                  className="w-12 h-12"
                />
                <p className="ml-1 text-sm lg:text-lg text-gray-800">Node.js</p>
              </div>
              <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="https://i.ibb.co.com/Q8H26fm/mongodb-icon.webp"
                  alt="MongoDB"
                  className="w-12 h-12"
                />
                <p className="ml-1 text-sm lg:text-lg text-gray-800">MongoDB</p>
              </div>
              <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="https://i.ibb.co.com/hyM30Kn/tailwind-css-icon-1024x615-fdeis5r1.png"
                  alt="Tailwind CSS"
                  className="w-12 h-12"
                />
                <p className="ml-1 text-sm lg:text-lg text-gray-800">
                  Tailwind CSS
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-6 sm:px-12 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Here are a few reasons why businesses trust InvoiceApp with their
              invoicing needs:
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="bg-gray-100 text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl text-slate-800 font-semibold">
                  Easy to Use
                </h3>
                <p className="mt-4 text-slate-800 text-lg">
                  Our user-friendly interface makes invoicing fast and easy,
                  even for non-technical users.
                </p>
              </div>
              <div className="bg-gray-100 text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl text-slate-800 font-semibold">
                  Secure and Reliable
                </h3>
                <p className="mt-4 text-slate-800 text-lg">
                  We prioritize the security of your data, using advanced
                  encryption and secure authentication protocols.
                </p>
              </div>
              <div className="bg-gray-100 text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl text-slate-800 font-semibold">
                  Scalable
                </h3>
                <p className="mt-4 text-slate-800 text-lg">
                  InvoiceApp grows with your business, offering features that
                  scale from small startups to large enterprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 sm:px-12 bg-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions? Feel free to reach out. We're here to help!
            </p>
            <button className="mt-8 px-6 py-3 bg-[#0E86D4] text-white rounded-md shadow-lg hover:bg-[#055c9d] transition-all duration-300">
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
