"use client";

import { useState, useEffect } from "react";
import { Calculator, DollarSign, Users, Calendar, Plane, Home, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button"
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/Navbar";

const BudgetEstimatorPage = () => {
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(7);
  const [destination, setDestination] = useState("europe");
  const [accommodation, setAccommodation] = useState("mid-range");
  const [transportation, setTransportation] = useState("public");
  const [estimate, setEstimate] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate budget based on inputs
  const calculateBudget = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setShowResults(false);
    
    // Price factors
    const destinationFactor = {
      "europe": 1.2,
      "asia": 0.8,
      "north-america": 1.3,
      "south-america": 0.9,
      "africa": 0.85,
      "australia": 1.25
    }[destination] || 1;
    
    const accommodationFactor = {
      "budget": 0.7,
      "mid-range": 1,
      "luxury": 2.5
    }[accommodation] || 1;
    
    const transportationFactor = {
      "public": 0.6,
      "rental": 1.2,
      "private": 1.8
    }[transportation] || 1;
    
    // Base costs per person per day (in USD)
    const baseCosts = {
      accommodation: 80,
      food: 40,
      transportation: 20,
      activities: 30,
      other: 15
    };
    
    // Calculate individual costs
    const accommodationCost = Math.round(baseCosts.accommodation * accommodationFactor * destinationFactor * days * (travelers > 1 ? 0.8 : 1));
    const foodCost = Math.round(baseCosts.food * destinationFactor * days * travelers);
    const transportationCost = Math.round(baseCosts.transportation * transportationFactor * destinationFactor * days * travelers);
    const activitiesCost = Math.round(baseCosts.activities * destinationFactor * days * travelers);
    const otherCost = Math.round(baseCosts.other * destinationFactor * days * travelers);
    
    // Total cost
    const totalCost = accommodationCost + foodCost + transportationCost + activitiesCost + otherCost;
    
    // Simulate API delay
    setTimeout(() => {
      setEstimate({
        accommodation: accommodationCost,
        food: foodCost,
        transportation: transportationCost,
        activities: activitiesCost,
        other: otherCost,
        total: totalCost
      });
      setIsCalculating(false);
      setShowResults(true);
    }, 1500);
  };

  // Calculate percentage for each expense category
  const getPercentage = (value) => {
    return estimate ? (value / estimate.total) * 100 : 0;
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-wanderwise-light to-white">
      <Navbar />
      {/* Header */}
      <div className="bg-wanderwise-light-blue py-12 mb-12 bg-opacity-90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Travel Budget Estimator
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto animate-fade-in">
            Plan your trip finances with our easy-to-use calculator
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Card className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Form Section */}
            <div className="p-8 bg-white">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-wanderwise-primary" />
                  Trip Details
                </CardTitle>
                <CardDescription>
                  Fill in your trip information to get a customized budget estimate
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-0 py-4">
                <form onSubmit={calculateBudget} className="space-y-6">
                  {/* Travelers */}
                  <div>
                    <label htmlFor="travelers" className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
                      <Users className="w-5 h-5 text-wanderwise-primary" />
                      Number of Travelers
                    </label>
                    <Input
                      type="number"
                      id="travelers"
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="focus:ring-wanderwise-primary focus:border-wanderwise-primary"
                    />
                  </div>
                  
                  {/* Days */}
                  <div>
                    <label htmlFor="days" className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-wanderwise-primary" />
                      Trip Duration (days)
                    </label>
                    <Input
                      type="number"
                      id="days"
                      value={days}
                      onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="focus:ring-wanderwise-primary focus:border-wanderwise-primary"
                    />
                  </div>
                  
                  {/* Destination */}
                  <div>
                    <label htmlFor="destination" className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-wanderwise-primary" />
                      Destination Region
                    </label>
                    <select
                      id="destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-primary"
                    >
                      <option value="europe">Europe</option>
                      <option value="asia">Asia</option>
                      <option value="north-america">North America</option>
                      <option value="south-america">South America</option>
                      <option value="africa">Africa</option>
                      <option value="australia">Australia & Oceania</option>
                    </select>
                  </div>
                  
                  {/* Accommodation */}
                  <div>
                    <label htmlFor="accommodation" className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
                      <Home className="w-5 h-5 text-wanderwise-primary" />
                      Accommodation Type
                    </label>
                    <select
                      id="accommodation"
                      value={accommodation}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-primary"
                    >
                      <option value="budget">Budget (Hostels, Guesthouses)</option>
                      <option value="mid-range">Mid-Range (3-star Hotels)</option>
                      <option value="luxury">Luxury (4-5 star Hotels)</option>
                    </select>
                  </div>
                  
                  {/* Transportation */}
                  <div>
                    <label htmlFor="transportation" className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
                      <Plane className="w-5 h-5 text-wanderwise-primary" />
                      Transportation Preference
                    </label>
                    <select
                      id="transportation"
                      value={transportation}
                      onChange={(e) => setTransportation(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-primary"
                    >
                      <option value="public">Public Transportation</option>
                      <option value="rental">Rental Car/Scooter</option>
                      <option value="private">Private Transfers/Taxis</option>
                    </select>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-6 bg-wanderwise-primary hover:bg-blue-600"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Calculator className="mr-2 w-5 h-5" />
                        Calculate Budget
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </div>
            
            {/* Results Section */}
            <div className={`bg-blue-600 text-white p-8 transition-all duration-500 ${showResults ? "opacity-100" : "opacity-90"}`}>
              <CardHeader className="px-0 pt-0 items-center">
                <CardTitle className="text-2xl font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Estimated Budget
                </CardTitle>
              </CardHeader>
              
              <CardContent className="px-0 py-4">
                {estimate ? (
                  <div className="space-y-6 animate-slide-in">
                    <div>
                      <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                        ${estimate.total.toLocaleString()}
                      </p>
                      <p className="text-white/80 text-lg">Total estimated budget</p>
                    </div>
                    
                    {/* Budget breakdown with progress bars */}
                    <div className="mt-8 space-y-4">
                      <h3 className="text-xl font-medium mb-4">Budget Breakdown</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span>Accommodation</span>
                            <span className="font-medium">${estimate.accommodation.toLocaleString()}</span>
                          </div>
                          <Progress value={getPercentage(estimate.accommodation)} className="h-2 bg-white/20" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span>Food & Drinks</span>
                            <span className="font-medium">${estimate.food.toLocaleString()}</span>
                          </div>
                          <Progress value={getPercentage(estimate.food)} className="h-2 bg-white/20" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span>Transportation</span>
                            <span className="font-medium">${estimate.transportation.toLocaleString()}</span>
                          </div>
                          <Progress value={getPercentage(estimate.transportation)} className="h-2 bg-white/20" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span>Activities & Tours</span>
                            <span className="font-medium">${estimate.activities.toLocaleString()}</span>
                          </div>
                          <Progress value={getPercentage(estimate.activities)} className="h-2 bg-white/20" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span>Miscellaneous</span>
                            <span className="font-medium">${estimate.other.toLocaleString()}</span>
                          </div>
                          <Progress value={getPercentage(estimate.other)} className="h-2 bg-white/20" />
                        </div>
                      </div>
                      
                      <div className="border-t border-white/20 pt-4 mt-6">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Per Person</span>
                          <span className="font-medium">${Math.round(estimate.total / travelers).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Per Day</span>
                          <span className="font-medium">${Math.round(estimate.total / days).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <h3 className="font-medium mb-2">Budget saving tips:</h3>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <ArrowRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Book accommodation in advance to secure better rates</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Consider alternative accommodations like guesthouses</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Eat where the locals eat to save on food costs</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Look for city passes that include multiple attractions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <p className="text-4xl mb-4">Fill in your trip details</p>
                    <p className="text-white/80 text-2xl underline decoration-dotted">
                      Enter your information on the left and calculate to see your personalized budget estimate
                    </p>
                  </div>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
        
        {/* Disclaimer */}
        <p className="text-sm text-gray-500 text-center mt-6 max-w-2xl mx-auto pb-8">
          Note: This is an estimation based on average costs. Actual expenses may vary based on specific destinations, 
          travel style, season, and current market rates. We recommend adding a 10-15% buffer to your budget.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default BudgetEstimatorPage;
