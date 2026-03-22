import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, contactsRes] = await Promise.all([
        axios.get(`${API}/bookings`),
        axios.get(`${API}/contact`)
      ]);
      setBookings(bookingsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.patch(`${API}/bookings/${bookingId}`, { status: newStatus });
      toast.success("Booking status updated");
      fetchData();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "confirmed":
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2" data-testid="admin-heading">
            Admin Dashboard
          </h1>
          <p className="text-lg text-slate-700">Manage bookings and customer inquiries</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => setActiveTab("bookings")}
              data-testid="admin-bookings-tab"
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "bookings"
                  ? "text-sky-600 border-b-2 border-sky-600"
                  : "text-slate-600 hover:text-sky-600"
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              data-testid="admin-contacts-tab"
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "contacts"
                  ? "text-sky-600 border-b-2 border-sky-600"
                  : "text-slate-600 hover:text-sky-600"
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
          </div>
        </div>

        {activeTab === "bookings" && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-100 text-center">
                <p className="text-slate-500">No bookings yet</p>
              </div>
            ) : (
              bookings.map((booking, idx) => (
                <div
                  key={booking.id}
                  data-testid={`admin-booking-${idx}`}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{booking.service}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start space-x-2 text-slate-600">
                          <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Date:</span> {booking.date}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-slate-600">
                          <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Time:</span> {booking.time}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-slate-600">
                          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Name:</span> {booking.name}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-slate-600">
                          <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Phone:</span> {booking.phone}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-slate-600 md:col-span-2">
                          <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Email:</span> {booking.email}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-slate-600 md:col-span-2">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Address:</span> {booking.address}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => updateBookingStatus(booking.id, "confirmed")}
                        data-testid={`confirm-booking-${idx}`}
                        disabled={booking.status === "confirmed" || booking.status === "completed"}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, "completed")}
                        data-testid={`complete-booking-${idx}`}
                        disabled={booking.status === "completed" || booking.status === "cancelled"}
                        className="bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, "cancelled")}
                        data-testid={`cancel-booking-${idx}`}
                        disabled={booking.status === "cancelled" || booking.status === "completed"}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-100 text-center">
                <p className="text-slate-500">No contact messages yet</p>
              </div>
            ) : (
              contacts.map((contact, idx) => (
                <div
                  key={contact.id}
                  data-testid={`admin-contact-${idx}`}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start space-x-2 text-slate-600">
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Name:</span> {contact.name}
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 text-slate-600">
                        <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Phone:</span> {contact.phone}
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 text-slate-600">
                        <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Email:</span> {contact.email}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-slate-700 mb-1">Message:</p>
                        <p className="text-slate-600">{contact.message}</p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(contact.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
