const PopularLots = () => {
    const lots = [
      {
        id: 1,
        image: "https://via.placeholder.com/200", // Replace with actual image URLs
        title: "Blind date with a book",
        closing: "01/02/2025",
        bids: 15,
        price: "€120",
      },
      {
        id: 2,
        image: "https://via.placeholder.com/200",
        title: "Handmade Amigurumi of Your Favorite Animal",
        closing: "12/03/2025",
        bids: 32,
        price: "€160",
      },
      {
        id: 3,
        image: "https://via.placeholder.com/200",
        title: "Your Furry Friend, Hand-Painted",
        closing: "04/03/2025",
        bids: 7,
        price: "€70",
      },
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Lots</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lots.map((lot) => (
              <div key={lot.id} className="bg-blue-300 text-white p-6 rounded-lg shadow-md">
                <img
                  src={lot.image}
                  alt={lot.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold">{lot.title}</h3>
                <hr className="border-gray-400 my-4" />
                <p>Closing: {lot.closing}</p>
                <p>{lot.bids} bids</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-2xl font-bold">{lot.price}</span>
                  <button className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600">
                    View Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PopularLots;
  