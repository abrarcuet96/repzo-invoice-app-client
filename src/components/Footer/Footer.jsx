import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaPlay, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-50 text-gray-700 py-10 mt-40">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 lg:px-10">
          {/* Services */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Services</h6>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-indigo-600 transition">Branding</a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">Design</a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">Marketing</a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">
                  Advertisement
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Company</h6>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-indigo-600 transition">About us</a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">Contact</a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">Jobs</a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">Press kit</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Legal</h6>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-indigo-600 transition">Terms of use</a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">
                  Privacy policy
                </a>
              </li>
              <li>
                <a className="hover:text-indigo-600 transition">
                  Cookie policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <footer className="bg-gray-100 text-gray-600 border-t border-gray-200 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 lg:px-10">
          {/* Logo and Rights */}
          <div className="flex items-center space-x-4">
            <AiOutlineCopyrightCircle size={24} className="text-gray-700" />
            <p className="text-sm">
              RepZo Invoice Ltd. <br />© {new Date().getFullYear()} - Md Abrar
              Haider
            </p>
          </div>

          {/* Social Links */}
          <nav className="mt-4 md:mt-0 flex space-x-6">
            <a className="hover:text-indigo-600 transition">
              <FaFacebookF size={24} />
            </a>
            <a className="hover:text-indigo-600 transition">
              <FaTwitter size={24} />
            </a>
            <a className="hover:text-indigo-600 transition">
              <FaInstagram size={24} />
            </a>
            <a className="hover:text-indigo-600 transition">
              <FaPlay size={24} />
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
