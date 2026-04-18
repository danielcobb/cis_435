import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function ListingDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}`);
        setListing(data);
      } catch (err) {
        setError("Listing not found");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      navigate("/");
    } catch (err) {
      setDeleteError(err.response?.data?.message || "Failed to delete listing");
    }
  };

  if (loading) return <p style={styles.message}>Loading listing...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (!listing) return null;

  const isOwner = user && listing.seller?._id === user._id;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link to="/" style={styles.backLink}>
          {"<- Back to listings"}
        </Link>
        {listing.imageUrl && (
          <img
            src={`http://localhost:5001${listing.imageUrl}`}
            alt={listing.title}
            style={styles.image}
          />
        )}
        <span
          style={{
            ...styles.badge,
            backgroundColor:
              listing.listingType === "bike" ? "#2b6cb0" : "#276749",
          }}
        >
          {listing.listingType === "bike" ? "Bike" : "Part"}
        </span>

        <h1 style={styles.title}>{listing.title}</h1>
        <p style={styles.brand}>{listing.brand}</p>

        <div style={styles.priceRow}>
          <span style={styles.price}>${listing.price}</span>
          <span style={styles.condition}>{listing.condition}</span>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Description</h3>
          <p style={styles.description}>{listing.description}</p>
        </div>

        {listing.listingType === "bike" && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Bike Details</h3>
            <div style={styles.detailsGrid}>
              {listing.frameSize && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Frame Size</span>
                  <span style={styles.detailValue}>{listing.frameSize}</span>
                </div>
              )}

              {listing.wheelSize && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Wheel Size</span>
                  <span style={styles.detailValue}>{listing.wheelSize}</span>
                </div>
              )}

              {listing.suspensionType && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Suspension</span>
                  <span style={styles.detailValue}>
                    {listing.suspensionType}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {listing.listingType === "part" && listing.partCategory && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Part Details</h3>
            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Category</span>
                <span style={styles.detailValue}>{listing.partCategory}</span>
              </div>
            </div>
          </div>
        )}

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Seller Information</h3>
          <p style={styles.sellerName}>
            Posted by <strong>{listing.seller?.username || "Unknown"}</strong>
          </p>
          {listing.seller?.email && (
            <p style={styles.sellerEmail}>
              Contact:{" "}
              <a href={`mailto:${listing.seller.email}`}>
                {listing.seller.email}
              </a>
            </p>
          )}
          <p style={styles.postedDate}>
            Listed on {new Date(listing.createdAt).toLocaleDateString()}
          </p>
        </div>

        {isOwner && (
          <div style={styles.ownerActions}>
            {deleteError && <p style={styles.error}>{deleteError}</p>}
            <button style={styles.deleteButton} onClick={handleDelete}>
              Delete Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  backLink: {
    color: "#2b6cb0",
    textDecoration: "none",
    fontSize: "0.95rem",
    marginBottom: "0.5rem",
    display: "inline-block",
  },
  badge: {
    display: "inline-block",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    width: "fit-content",
  },
  title: {
    fontSize: "1.8rem",
    color: "#1a1a2e",
    margin: 0,
  },
  brand: {
    color: "#666",
    fontSize: "1rem",
    margin: 0,
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  price: {
    fontSize: "1.8rem",
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
  section: {
    borderTop: "1px solid #eee",
    paddingTop: "1rem",
    marginTop: "0.5rem",
  },
  sectionTitle: {
    fontSize: "1rem",
    color: "#1a1a2e",
    marginBottom: "0.75rem",
  },
  description: {
    color: "#444",
    lineHeight: "1.6",
    margin: 0,
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "1rem",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  detailLabel: {
    fontSize: "0.8rem",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  detailValue: {
    fontSize: "1rem",
    color: "#1a1a2e",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  sellerName: {
    color: "#444",
    margin: "0 0 0.25rem 0",
  },
  sellerEmail: {
    color: "#444",
    margin: "0 0 0.25rem 0",
  },
  postedDate: {
    color: "#888",
    fontSize: "0.85rem",
    margin: 0,
  },
  ownerActions: {
    borderTop: "1px solid #eee",
    paddingTop: "1rem",
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  deleteButton: {
    padding: "0.75rem",
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
  },
  message: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.1rem",
    marginTop: "3rem",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: "1.1rem",
    marginTop: "3rem",
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "8px",
    objectPosition: "center",
    marginBottom: "0.5rem",
  },
};

export default ListingDetail;
