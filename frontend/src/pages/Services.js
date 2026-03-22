import { Link } from "react-router-dom";
import { AirVent, Tv, Waves, Droplets, Refrigerator, CarFront, Cctv, Car, Wrench, Zap, Thermometer } from "lucide-react";

export default function Services() {
  const homeServices = [
    {
      name: "AC Service & Repair",
      icon: AirVent,
      description: "Complete AC installation, repair, gas filling, and maintenance services for all brands.",
      image: "https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "TV Service & Repair",
      icon: Tv,
      description: "Expert repair for LED, LCD, Smart TVs. Screen replacement and maintenance available.",
      image: "https://images.pexels.com/photos/4440621/pexels-photo-4440621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Washing Machine Service",
      icon: Waves,
      description: "Repair and maintenance for all types of washing machines - top load and front load.",
      image: "https://images.unsplash.com/photo-1758279745240-b75977c88fa8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwyfHx3YXNoaW5nJTIwbWFjaGluZSUyMHJlcGFpciUyMHRlY2huaWNpYW4lMjBsYXVuZHJ5JTIwcm9vbXxlbnwwfHx8fDE3NzQxNjExOTd8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "RO Water Purifier Service",
      icon: Droplets,
      description: "Installation, repair, filter replacement, and AMC services for all RO brands.",
      image: "https://images.pexels.com/photos/6857798/pexels-photo-6857798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Refrigerator Service",
      icon: Refrigerator,
      description: "Gas filling, compressor repair, and complete maintenance for all refrigerator types.",
      image: "https://images.pexels.com/photos/5146918/pexels-photo-5146918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Plumbing Services",
      icon: Wrench,
      description: "Leak fixing, pipe installation, bathroom fittings, and all plumbing solutions.",
      image: "https://images.pexels.com/photos/7327156/pexels-photo-7327156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Electrical Services",
      icon: Zap,
      description: "Wiring, switch installation, MCB repair, and complete electrical solutions.",
      image: "https://images.pexels.com/photos/5691589/pexels-photo-5691589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Geyser Service",
      icon: Thermometer,
      description: "Installation, thermostat repair, element replacement for all geyser brands.",
      image: "https://images.pexels.com/photos/6436774/pexels-photo-6436774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "CCTV Installation & Service",
      icon: Cctv,
      description: "Complete CCTV installation, configuration, and maintenance for home security.",
      image: "https://images.pexels.com/photos/5966513/pexels-photo-5966513.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
  ];

  const vehicleServices = [
    {
      name: "Car Washing Service",
      icon: CarFront,
      description: "Premium car washing, interior cleaning, and detailing at your doorstep.",
      image: "https://images.pexels.com/photos/6872577/pexels-photo-6872577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Diesel Car Rental",
      icon: Car,
      description: "Affordable diesel car rental with driver. Daily and monthly packages available.",
      image: "https://images.pexels.com/photos/36451132/pexels-photo-36451132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Petrol Car Rental",
      icon: Car,
      description: "Comfortable petrol car rental for local and outstation trips with flexible pricing.",
      image: "https://images.pexels.com/photos/6369306/pexels-photo-6369306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
  ];

  const ServiceCard = ({ service, index, testIdPrefix }) => {
    const Icon = service.icon;
    return (
      <div
        data-testid={`${testIdPrefix}-service-${index}`}
        className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all"
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
            <Icon className="h-6 w-6 text-sky-600" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">{service.name}</h3>
          <p className="text-base text-slate-600 mb-4">{service.description}</p>
          <Link
            to="/booking"
            data-testid={`${testIdPrefix}-book-btn-${index}`}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all hover:-translate-y-0.5"
          >
            Book Now
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4" data-testid="services-page-heading">
            Our Services
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Professional home and vehicle services delivered with care and expertise
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-8" data-testid="home-services-heading">
            Home Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} index={idx} testIdPrefix="home" />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-8" data-testid="vehicle-services-heading">
            Vehicle Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} index={idx} testIdPrefix="vehicle" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}