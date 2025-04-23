import AnimatedText from "../AnimatedText";
import Navbar from "../Navbar/Navbar";

export default function Hero() {
  return (
    <div className="relative bg-gray-800 text-white">
        <Navbar />
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzY2VuZXJ5fGVufDB8fDB8fHww"
          alt="Background"
          className="object-cover w-full h-full opacity-50"
        />
      </div>
      <div className="flex justify-start ml-30">
        <div className="mt-auto mb-auto z-10 w-130">
            <h1 className="text-5xl font-bold mb-4">Discover Your Next Trip</h1>
            {/* <AnimatedText text = 'Plan your dream trip with WanderWise'/> */}
            <h2 className="font-extrabold mb-4 mt-4">WanderWise is your smart travel companion.</h2>
            <p>We help you plan unforgettable journeys with curated destinations, hotel and activity suggestions, and an easy-to-use budget estimator. Whether you're dreaming of a tropical escape or a cultural city break, WanderWise makes it simple and inspiring.</p>
            <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 mt-5">
              Explore Now
            </button>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
            
        </div>
      </div>
    </div>
  );
}