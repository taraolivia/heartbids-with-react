import { Link } from "react-router-dom"; 

const Hero = () => {
  return (
<section className="bg-gradient-to-b from-background-50 to-primary-200 pt-30  xl:h-screen">
<div className=" h-full mx-auto sm:px-0 lg:px-0 flex flex-col lg:flex-wrap max-w-[1900px]">
    
    {/* Left Text Section */}
    <div className="xl:w-1/3 max-h-3/4 flex flex-col md:px-10 text-center px-5 align-center items-center lg:items-start lg:text-left justify-evenly m-auto h-full lg:max-w-150">
      <h1 className="font-serif text-5xl font-bold text-gray-800 leading-tight">
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
    <div className="xl:w-1/2 w-full xl:max-w-5xl xl:relative xl:overflow-visible flex h-full overflow-hidden items-end justify-center m-auto">
      
      {/* Flower Gift (Main Left) */}
      <img 
        src="/images/hero/flower-gift.png" 
        alt="Gift Wrapping" 
        className="xl:w-2/5 h-auto shadow-lg xl:absolute xl:bottom-0 xl:left-10 z-30 lg:relative lg:w-1/4"
      />

      {/* Map (Overlapping Bottom Left) */}
      <img 
        src="/images/hero/custom-map.png" 
        alt="Custom Map" 
        className="xl:w-1/4 h-auto shadow-md xl:absolute bottom-0 xl:left-0 z-40 lg:relative lg:w-1/6"
      />

      {/* Dog Painting (Main Right) */}
      <img 
        src="/images/hero/dog-painting.png" 
        alt="Dog Painting" 
        className="xl:w-9/10 xl:max-w-2xl max-w-xs max-h-full h-auto shadow-lg xl:absolute xl:-top-30 right-0 lg:relative lg:w-1/4"
      />

      {/* Runner Image (Overlapping Bottom Right) */}
      <img 
        src="/images/hero/runner.png" 
        alt="Runner" 
        className="xl:w-3/5 h-auto shadow-md xl:absolute bottom-0 right-0 z-40 lg:relative lg:w-2/4"
      />
      
    </div>
  </div>
</section>


  );
};

export default Hero;
