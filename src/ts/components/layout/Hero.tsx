import { Link } from "react-router-dom"; 

const Hero = () => {
  return (
<section className=" bg-gradient-to-b from-background-50 to-primary-200 h-screen pt-30">
  <div className=" h-full mx-auto sm:px-0 lg:px-0 flex flex-col lg:flex-row">
    
    {/* Left Text Section */}
    <div className="lg:w-1/2 max-h-3/4 flex flex-col md:px-10 text-center px-5 align-center items-center lg:items-start lg:text-left justify-evenly m-auto h-full lg:max-w-150">
      <h1 className="text-4xl font-bold text-gray-800 leading-tight">
        An auction platform where winning bids fund a charity of your choice.
      </h1>
      <div className="flex gap-3 items-center align-center justify-center mt-5 mb-8"> 
             {/* Avatars */}
      <div className="flex  mt-2 ml-1">
        <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User 1" className="w-10 h-10 rounded-full object-cover object-center border-2 border-white -ml-2" />
        <img src="https://images.pexels.com/photos/3482526/pexels-photo-3482526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User 2" className="w-10 h-10 rounded-full object-cover object-center border-2 border-white -ml-2" />
        <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User 3" className="w-10 h-10 rounded-full object-cover object-center border-2 border-white -ml-2" />
      </div>    
      <p className="text-gray-600 flex-1">
        Join <span className="font-bold text-gray-800">4600+ users</span> and start giving to charity right now.
      </p>

    
      </div>


      {/* Button */}
      <Link to="/listings" className="bg-accent-500 text-white px-6 py-3 my-6 rounded-lg shadow-md hover:bg-accent-600 w-fit">
        Browse listings
      </Link>
    </div>

    {/* Right Image Section (Stacked & Contained) */}
    <div className="lg:w-1/2 md:w-full lg:relative lg:overflow-visible flex h-full overflow-hidden items-end justify-center">
      
      {/* Flower Gift (Main Left) */}
      <img 
        src="/images/hero/flower-gift.png" 
        alt="Gift Wrapping" 
        className="lg:w-2/5 h-auto shadow-lg lg:absolute lg:bottom-0 lg:left-10 z-30 md:relative md:w-1/4"
      />

      {/* Map (Overlapping Bottom Left) */}
      <img 
        src="/images/hero/custom-map.png" 
        alt="Custom Map" 
        className="lg:w-1/4 h-auto shadow-md lg:absolute bottom-0 left-0 z-50 md:relative md:w-1/6"
      />

      {/* Dog Painting (Main Right) */}
      <img 
        src="/images/hero/dog-painting.png" 
        alt="Dog Painting" 
        className="lg:w-9/10 max-w-2xl max-h-full h-auto shadow-lg lg:absolute lg:-top-30 right-0 md:relative md:w-1/4"
      />

      {/* Runner Image (Overlapping Bottom Right) */}
      <img 
        src="/images/hero/runner.png" 
        alt="Runner" 
        className="lg:w-3/5 h-auto shadow-md lg:absolute bottom-0 right-0 z-40 md:relative md:w-2/4"
      />
      
    </div>
  </div>
</section>


  );
};

export default Hero;
