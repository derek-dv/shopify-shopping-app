import Footer from "./footer";
import Navbar from "./navbar";
import "../../styles/layout/index.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
