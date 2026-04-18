import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
Navbar that's included on each page. If the user is logged in, it displays their username,
the link to create a listing, and the logout button. For non-logged in users, it displays
the option to register or login. 
*/
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); //after logout navigate to the homepage
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        MTB Marketplace
      </Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.username}>Hi, {user.username}</span>
            <Link to="/listings/new" style={styles.link}>
              Create a new listing
            </Link>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  brand: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  username: {
    color: "#a0aec0",
  },
  button: {
    background: "none",
    border: "1px solid white",
    color: "white",
    padding: "0.4rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
