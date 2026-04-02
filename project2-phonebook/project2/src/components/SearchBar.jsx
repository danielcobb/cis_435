function SearchBar({ filterText, onFilterChange }) {
  function handleChange(e) {
    onFilterChange(e.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search Contacts</label>
      <input
        id="search"
        type="search"
        value={filterText}
        onChange={handleChange}
        placeholder="Search by name or email"
      />
    </div>
  );
};

export default SearchBar;
