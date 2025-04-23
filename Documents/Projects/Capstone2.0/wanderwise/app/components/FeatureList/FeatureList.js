// Grid or horizontal scroll of 3-6 destination cards. Each card includes an image, destination name, short enticing description, and a hover effect (e.g. zoom or slide). Action "View More" or "Explore".
export default function FeatureList(){
    return (
        <div className="flex-col justify-center">
            <div className="text-center pt-10 pb-10">
                <h1 className="text-5xl font-bold mb-4">Featrued List</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img src="https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzY2VuZXJ5fGVufDB8fDB8fHww" alt="Destination" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-bold">Destination Name</h3>
                        <p className="text-gray-600 mt-2">Short enticing description of the destination.</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">View More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}