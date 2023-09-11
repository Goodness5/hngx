import React,{useState} from 'react';

const Sidebar = ({ handlesearch, showsidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handlesearch(searchQuery);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white flex flex-col p-4 w-60 z-50 absolute h-full top-0 right-0 transition-transform transform translate-x-full ease-in-out">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="What do you want to watch?"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Sign up
      </button>
    </div>
  );
};

export default Sidebar;
