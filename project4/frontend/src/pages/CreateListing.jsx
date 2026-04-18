import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    listingType: "bike",
    title: "",
    brand: "",
    price: "",
    condition: "",
    description: "",

    // Bike specific
    frameSize: null,
    wheelSize: null,
    suspensionType: null,

    // Part specific
    partCategory: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  //if the user isn't logged in, redirect them to the login page
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const value = e.target.value === "" ? null : e.target.value; //converts empty strings to null for optional fields
    setFormData({ ...formData, [e.target.name]: value }); //uses input's name as key for input fields
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); //stores images
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the browser from refreshing the page
    setError(null); //clears errors

    if (!formData.condition) {
      //check if the condition of the item is selected
      return setError("Please select a condition");
    }

    if (!imageFile) {
      return setError("Please upload an image");
    }

    setLoading(true); //disables the submit button

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        //loop through each field in formData
        if (formData[key] !== null) {
          //skip null values
          data.append(key, formData[key]);
        }
      });

      if (imageFile) {
        data.append("image", imageFile); //add the image file separately
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, //sends the JWT to the backend
        },
      };

      await axios.post("/api/listings", data, config);
      navigate("/"); //after submission, return to the home page
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create a listing</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Listing Type</label>
            <select
              style={styles.input}
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              required
            >
              <option value="bike">Bike</option>
              <option value="part">Part</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Brand</label>
            <input
              style={styles.input}
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Price ($)</label>
            <input
              style={styles.input}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Condition</label>
            <select
              style={styles.input}
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              style={{ ...styles.input, height: "120px", resize: "vertical" }}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {formData.listingType === "bike" && (
            <>
              <div style={styles.field}>
                <label style={styles.label}>Frame Size</label>
                <select
                  style={styles.input}
                  name="frameSize"
                  value={formData.frameSize}
                  onChange={handleChange}
                >
                  <option value="">Select frame size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Wheel Size</label>
                <select
                  style={styles.input}
                  name="wheelSize"
                  value={formData.wheelSize}
                  onChange={handleChange}
                >
                  <option value="">Select wheel size</option>
                  <option value='26"'>26"</option>
                  <option value='27.5"'>27.5"</option>
                  <option value='27.5+"'>27.5+"</option>
                  <option value='29"'>29"</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Suspension Type</label>
                <select
                  style={styles.input}
                  name="suspensionType"
                  value={formData.suspensionType}
                  onChange={handleChange}
                >
                  <option value="">Select suspension type</option>
                  <option value="hardtail">Hardtail</option>
                  <option value="full suspension">Full Suspension</option>
                  <option value="rigid">Rigid</option>
                </select>
              </div>
            </>
          )}

          {formData.listingType === "part" && (
            <>
              <div style={styles.field}>
                <label style={styles.label}>Part Category</label>
                <select
                  style={styles.input}
                  name="partCategory"
                  value={formData.partCategory}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  <option value="fork">Fork</option>
                  <option value="drivetrain">Drivetrain</option>
                  <option value="brakes">Brakes</option>
                  <option value="wheels">Wheels</option>
                  <option value="handlebars">Handlebars</option>
                  <option value="seat">Seat</option>
                  <option value="frame">Frame</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
              required
            />
            {imageFile && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  marginTop: "0.4rem",
                }}
              >
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#1a1a2e",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.4rem",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    marginTop: "1rem",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "0.9rem",
  },
};

export default CreateListing;
