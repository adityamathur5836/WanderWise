export default function AboutGrid() {
  return (
    <div>
        <h1 className="text-center pt-20 text-3xl font-extrabold">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-20">
            <div className="text-center border-1 rounded-xl shadow-2xl bg-[#ffbe0b]"><h1 className="font-bold text-2xl p-5 underline md:decoration-dashed">Smart Trip Planning</h1><p className="text-center pl-5 pr-5 pb-5">Plan your perfect journey effortlessly with personalized destination, hotel, and activity suggestions tailored to your interests and budget.</p></div>
            <div className="text-center border-1 rounded-xl shadow-2xl bg-[#1a659e]"><h1 className="font-bold text-2xl p-5 underline md:decoration-dashed text-white">Curated Stays & Activities</h1><p className="text-center pl-5 pr-5 pb-5 text-white">Discover top-rated accommodations and exciting experiences in every destination—handpicked to match your travel style.</p></div>
            <div className="text-center border-1 rounded-xl shadow-2xl bg-[#0077b6]"><h1 className="font-bold text-2xl p-5 underline md:decoration-dashed text-white">Save & Reuse Preferences</h1><p className="text-center pl-5 pr-5 pb-5 text-white">Your travel tastes matter. Save your favorite destinations and preferences to make planning even faster next time.</p></div>
            <div className="text-center border-1 rounded-xl shadow-2xl bg-[#f77f00]"><h1 className="font-bold text-2xl p-5 underline md:decoration-dashed">Explore More, Worry Less</h1><p className="text-center pl-5 pr-5 pb-5">Whether you're a solo traveler or planning a family getaway, WanderWise simplifies the whole process—leaving you free to enjoy the adventure.</p></div>
        </div>
    </div>
  );
}