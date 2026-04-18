import { useState, useEffect } from "react";
import axios from "axios";
import ListingCard from "../components/ListingCard";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [listingType, setListingType] = useState("");
  const [condition, setCondition] = useState("");

  const fetchListings = async () => {
    setLoading(true); //used when displaying loading icon
    setError(null);

    try {
      //build the filter query
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (listingType) params.append("listingType", listingType);
      if (condition) params.append("condition", condition);

      const { data } = await axios.get(`/api/listings?${params.toString()}`); //get the listings based on the query string
      setListings(data);
    } catch (err) {
      setError("failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(); //used to filter listings on the parts/bikes and condition filters
  }, [listingType, condition]);

  const handleSearch = (e) => {
    e.preventDefault(); //stop the page from reloading
    fetchListings();
  };

  const handleReset = () => {
    //reset button resets the filters to defaults, so showing all listings
    setSearch("");
    setListingType("");
    setCondition("");
    setTimeout(() => fetchListings(), 0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Browse Listings</h1>
      {}
      <div style={styles.filterBar}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          style={styles.select}
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
        >
          <option value="">All</option>
          <option value="bike">Bikes</option>
          <option value="part">Parts</option>
        </select>

        <select
          style={styles.select}
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">All conditions</option>
          <option value="new">New</option>
          <option value="like new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>

        <button style={styles.resetButton} type="button" onClick={handleReset}>
          Reset
        </button>
      </div>

      {!loading && (
        <p style={styles.resultsCount}>
          {listings.length} {listings.lenght === 1 ? "Listing" : "Listings"}{" "}
          found
        </p>
      )}

      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && listings.length === 0 && (
        <p style={styles.message}>No listings found.</p>
      )}

      <div style={styles.grid}>
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    color: "#1a1a2e",
    marginBottom: "1.5rem",
  },
  filterBar: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 1,
    minWidth: "200px",
    padding: "0.6rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  select: {
    padding: "0.6rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "white",
  },
  searchButton: {
    padding: "0.6rem 1.5rem",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  resetButton: {
    padding: "0.6rem 1.5rem",
    backgroundColor: "#718096",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  resultsCount: {
    color: "#666",
    marginBottom: "1rem",
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    alignItems: "stretch",
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
};

export default Home;
