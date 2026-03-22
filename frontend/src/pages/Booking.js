import { useState } from "react";
import { AirVent, Tv, Waves, Droplets, Refrigerator, CarFront, Cctv, Car, Wrench, Zap, Thermometer, Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: ""
  });
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const services = [
    { name: "AC Service & Repair", icon: AirVent },
    { name: "TV Service & Repair", icon: Tv },
    { name: "Washing Machine Service", icon: Waves },
    { name: "RO Water Purifier Service", icon: Droplets },
    { name: "Refrigerator Service", icon: Refrigerator },
    { name: "Car Washing Service", icon: CarFront },
    { name: "CCTV Installation & Service", icon: Cctv },
    { name: "Diesel Car Rental", icon: Car },
    { name: "Petrol Car Rental", icon: Car },
    { name: "Plumbing Services", icon: Wrench },
    { name: "Electrical Services", icon: Zap },
    { name: "Geyser Service", icon: Thermometer },
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  const handleServiceSelect = (serviceName) => {
    setFormData({ ...formData, service: serviceName });
    setStep(2);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/bookings`, formData);
      setBookingSuccess(true);
      toast.success("Booking confirmed! We'll contact you shortly.");
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setFormData({
      service: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      date: "",
      time: ""
    });
    setStep(1);
    setBookingSuccess(false);
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" data-testid="booking-success-icon" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4" data-testid="booking-success-heading">
              Booking Confirmed!
            </h2>
            <p className="text-lg text-slate-600 mb-2">
              Thank you for choosing Sewawala.com
            </p>
            <p className="text-base text-slate-500 mb-8">
              Our team will contact you shortly to confirm the appointment details.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8 text-left">
              <h3 className="font-semibold text-slate-900 mb-4">Booking Details:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Service:</span> {formData.service}</p>
                <p><span className="font-medium">Date:</span> {formData.date}</p>
                <p><span className="font-medium">Time:</span> {formData.time}</p>
                <p><span className="font-medium">Name:</span> {formData.name}</p>
                <p><span className="font-medium">Phone:</span> {formData.phone}</p>
              </div>
            </div>
            <button
              onClick={resetBooking}
              data-testid="book-another-service-btn"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-all"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4" data-testid="booking-heading">
              Book a Service
            </h1>
            <p className="text-lg text-slate-700">
              Select your service and schedule an appointment
            </p>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${
                step >= 1 ? "text-sky-600" : "text-slate-400"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-400"
                }`} data-testid="step-1-indicator">
                  1
                </div>
                <span className="font-medium hidden sm:inline">Service</span>
              </div>
              <div className="w-12 h-0.5 bg-slate-200"></div>
              <div className={`flex items-center space-x-2 ${
                step >= 2 ? "text-sky-600" : "text-slate-400"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-400"
                }`} data-testid="step-2-indicator">
                  2
                </div>
                <span className="font-medium hidden sm:inline">Details</span>
              </div>
              <div className="w-12 h-0.5 bg-slate-200"></div>
              <div className={`flex items-center space-x-2 ${
                step >= 3 ? "text-sky-600" : "text-slate-400"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3 ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-400"
                }`} data-testid="step-3-indicator">
                  3
                </div>
                <span className="font-medium hidden sm:inline">Confirm</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6" data-testid="select-service-heading">Select a Service</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleServiceSelect(service.name)}
                      data-testid={`service-option-${idx}`}
                      className="group p-4 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl transition-all text-center"
                    >
                      <Icon className="h-8 w-8 text-sky-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium text-slate-700 group-hover:text-sky-700">{service.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6" data-testid="booking-details-heading">
                Booking Details
              </h2>
              <div className="mb-6 p-4 bg-sky-50 border border-sky-100 rounded-lg">
                <p className="text-sm font-medium text-slate-700">Selected Service:</p>
                <p className="text-lg font-semibold text-sky-700">{formData.service}</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" /> Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="booking-name-input"
                    className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    data-testid="booking-phone-input"
                    className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" /> Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="booking-email-input"
                    className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" /> Service Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    data-testid="booking-address-input"
                    className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 resize-none"
                    placeholder="Enter complete address"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" /> Select Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      data-testid="booking-date-input"
                      className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
                      <Clock className="h-4 w-4 inline mr-1" /> Select Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      data-testid="booking-time-select"
                      className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    >
                      <option value="">Choose time slot</option>
                      {timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    data-testid="booking-back-btn"
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    data-testid="booking-continue-btn"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-sm transition-all"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6" data-testid="confirm-booking-heading">
                Confirm Your Booking
              </h2>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Service</p>
                  <p className="text-lg font-semibold text-slate-900">{formData.service}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Date</p>
                    <p className="font-semibold text-slate-900">{formData.date}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Time</p>
                    <p className="font-semibold text-slate-900">{formData.time}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Contact Details</p>
                  <p className="font-semibold text-slate-900">{formData.name}</p>
                  <p className="text-sm text-slate-700">{formData.phone} • {formData.email}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Service Address</p>
                  <p className="text-slate-900">{formData.address}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    data-testid="confirm-back-btn"
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="confirm-booking-btn"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-lg shadow-sm transition-all"
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}