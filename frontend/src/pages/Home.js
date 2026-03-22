import { Link } from "react-router-dom";
import { AirVent, Tv, Waves, Droplets, Refrigerator, CarFront, Cctv, Car, Wrench, Zap, Thermometer, CheckCircle, Clock, Shield, Star } from "lucide-react";

export default function Home() {
  const services = [
    { name: "AC Service", icon: AirVent, image: "https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "TV Repair", icon: Tv, image: "https://images.pexels.com/photos/4440621/pexels-photo-4440621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "Washing Machine", icon: Waves, image: "https://images.unsplash.com/photo-1758279745240-b75977c88fa8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwyfHx3YXNoaW5nJTIwbWFjaGluZSUyMHJlcGFpciUyMHRlY2huaWNpYW4lMjBsYXVuZHJ5JTIwcm9vbXxlbnwwfHx8fDE3NzQxNjExOTd8MA&ixlib=rb-4.1.0&q=85" },
    { name: "RO Purifier", icon: Droplets, image: "https://images.pexels.com/photos/6857798/pexels-photo-6857798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "Refrigerator", icon: Refrigerator, image: "https://images.pexels.com/photos/5146918/pexels-photo-5146918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "Car Wash", icon: CarFront, image: "https://images.pexels.com/photos/6872577/pexels-photo-6872577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "CCTV", icon: Cctv, image: "https://images.pexels.com/photos/5966513/pexels-photo-5966513.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { name: "Car Rental", icon: Car, image: "https://images.unsplash.com/photo-1760162754961-ed27f26b394f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxjYXIlMjByZW50YWwlMjB0cmF2ZWwlMjByb2FkJTIwdHJpcHxlbnwwfHx8fDE3NzQxNjEyMTB8MA&ixlib=rb-4.1.0&q=85" },
  ];

  const reviews = [
    { name: "Rajesh Kumar", rating: 5, text: "Excellent service! AC repair was done professionally and quickly. Highly recommend!", location: "Mumbai" },
    { name: "Priya Sharma", rating: 5, text: "Very satisfied with the washing machine service. The technician was skilled and polite.", location: "Pune" },
    { name: "Amit Patel", rating: 5, text: "Great car rental experience. Clean car and affordable pricing. Will use again!", location: "Delhi" },
  ];

  const features = [
    { icon: CheckCircle, title: "Verified Professionals", description: "All our technicians are certified and background-verified" },
    { icon: Clock, title: "Quick Service", description: "Same-day service available for urgent repairs" },
    { icon: Shield, title: "30-Day Warranty", description: "All services come with our quality guarantee" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-orange-50 py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900" data-testid="hero-heading">
                All Home & Vehicle Services at Your Doorstep
              </h1>
              <p className="text-lg text-slate-700 font-medium">
                Professional, reliable, and affordable services for all your home and vehicle needs. Book in minutes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  data-testid="hero-book-now-btn"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  Book Now
                </Link>
                <Link
                  to="/services"
                  data-testid="hero-view-services-btn"
                  className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-3 px-8 rounded-lg transition-colors text-center"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/5463582/pexels-photo-5463582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Professional technician servicing AC"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4" data-testid="services-section-heading">
              Our Services
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              From home repairs to vehicle services, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={idx}
                  to="/booking"
                  data-testid={`service-card-${idx}`}
                  className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-200 cursor-pointer"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center space-x-2 text-white">
                        <Icon className="h-5 w-5" />
                        <span className="font-semibold text-sm">{service.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              data-testid="view-all-services-btn"
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Why Choose Sewawala?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} data-testid={`feature-card-${idx}`} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-base text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4" data-testid="reviews-section-heading">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} data-testid={`review-card-${idx}`} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-base text-slate-700 mb-4">"{review.text}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{review.name}</p>
                  <p className="text-sm text-slate-500">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}