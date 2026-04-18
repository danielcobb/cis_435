import { Link } from "react-router-dom";

/*
Reusable listing card that holds all the listing information. Wraps the entire card in a link that 
takes the user to the detailed listing. If the description is longer than 100 characters, it gets
cut off at 100 followed by ... 
*/

function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing._id}`} style={styles.cardLink}>
      <div style={styles.card}>
        {listing.imageUrl && (
          <img
            src={`http://localhost:5001${listing.imageUrl}`}
            alt={listing.title}
            style={styles.image}
          />
        )}

        <h3 style={styles.title}>{listing.title}</h3>
        <p style={styles.brand}>{listing.brand}</p>

        <p style={styles.description}>
          {listing.description && listing.description.length > 100
            ? listing.description.substring(0, 100) + "..."
            : listing.description || ""}
        </p>
        <div style={styles.details}>
          <span style={styles.price}>${listing.price}</span>
          <span style={styles.condition}>{listing.condition}</span>
        </div>
        <p style={styles.seller}>
          Posted by {listing?.seller?.username || "unknown"}
        </p>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    height: "100%",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "1.2rem",
    color: "#1a1a2e",
    margin: 0,
  },
  brand: {
    color: "#666",
    fontSize: "0.9rem",
    margin: 0,
  },
  description: {
    color: "#444",
    fontSize: "0.95rem",
    margin: 0,
    lineHeight: "1.5",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  condition: {
    backgroundColor: "#f0f0f0",
    padding: "0.25rem 0.75rem",
    borderRadius: "4px",
    fontSize: "0.85rem",
    color: "#555",
    textTransform: "capitalize",
  },
  seller: {
    fontSize: "0.85rem",
    color: "#888",
    margin: 0,
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "4px",
    objectPosition: "center",
  },

  cardLink: {
    textDecoration: "none",
    color: "inherit", //stop the link from turning blue
    display: "block",
    height: "100%",
  },
};

export default ListingCard;
