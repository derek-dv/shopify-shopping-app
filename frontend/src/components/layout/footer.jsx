import { Link } from "react-router-dom";
import "../../styles/layout/footer.css";

function Footer() {
  return (
    <div className="footer">
        <div className="top">
          <Link to="/">About</Link>
          <Link to="/">Facebook</Link>
          <Link to="/">GitHub</Link>
        </div>
        <p>All rights reserved Derek David</p>
    </div>
  );
}

export default Footer;
