import Navbar from "../../components/Navbar/navbar";

export default function About() {
  return (
    <div className="bg-[#FDF6EC] min-h-screen w-full">
      <Navbar />
      <div className="absolute inset-0">
      <h1 className="text-center font-extrabold text-5xl pt-10 font-poppins font-semibold text-3xl md:text-4xl">About WanderWise</h1>
        {/* <img 
        src="https://www.oyorooms.com/travel-guide/wp-content/uploads/2020/01/Coonoor.jpg"
        className="w-full h-50 object-cover z-5"
        /> */}
      </div>
      <div>
        <h1 className="italic text-xl leading-relaxed text-gray-700 text-center pt-10 font-bold">" At WanderWise, we believe travel should be easy, inspiring, and tailored to you. "</h1>
      </div>
    </div>
  );
}