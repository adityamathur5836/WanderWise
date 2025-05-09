import Navbar from "../components/Navbar/Navbar";

export default function Explore() {
  return (
    <div className="relative bg-gray-800 text-white mt-auto mb-auto">
      <Navbar />
      <div className="absolute inset-0">
        <img
          src="https://img.freepik.com/free-photo/misurina-sunset_181624-34793.jpg?semt=ais_hybrid&w=740"
          alt="Background"
          className="object-cover w-full h-full opacity-50"
        />
      </div>
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center mt-40 mb-40">
            <div className="mt-auto mb-auto z-10 w-130">
                <h1 className="text-5xl font-bold mb-4">Explore Destinations</h1>
                <h2 className="font-extrabold mb-4 mt-4">Discover your next adventure with WanderWise</h2>
                <p>Find curated destinations, hotels, and activities tailored to your preferences</p>
                <input
                    type="text"
                    placeholder="Search by destination, activity, or keyword"
                    className="px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-5 w-90 text-black"
                />
            </div>
        </div>
    </div>
    </div>
  );
}