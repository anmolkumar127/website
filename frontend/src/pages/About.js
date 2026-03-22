import { Target, Eye, Shield, CheckCircle, Users, Clock } from "lucide-react";

export default function About() {
  const reasons = [
    {
      icon: Shield,
      title: "Trusted Professionals",
      description: "All our technicians are certified, experienced, and background-verified for your safety."
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Same-day service available. We value your time and ensure quick resolution."
    },
    {
      icon: CheckCircle,
      title: "Affordable Pricing",
      description: "Transparent pricing with no hidden charges. Quality service at competitive rates."
    },
    {
      icon: Users,
      title: "Customer Satisfaction",
      description: "10,000+ happy customers across India. Your satisfaction is our priority."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-sky-50 via-white to-orange-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6" data-testid="about-heading">
              About Sewawala.com
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed">
              Sewawala.com is India's leading on-demand home and vehicle service platform. We connect customers with verified professionals who provide quality services at affordable prices, right at your doorstep.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <Target className="h-8 w-8 text-sky-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900" data-testid="mission-heading">Our Mission</h2>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                To make quality home and vehicle services accessible to every Indian household. We believe in providing hassle-free, professional services that save your time and money while ensuring complete peace of mind.
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Eye className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900" data-testid="vision-heading">Our Vision</h2>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                To become India's most trusted service marketplace where customers can book any home or vehicle service with confidence, knowing they will receive the best quality and value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4" data-testid="why-choose-heading">
              Why Choose Us?
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional service experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div
                  key={idx}
                  data-testid={`reason-card-${idx}`}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-100 rounded-full mb-4">
                    <Icon className="h-7 w-7 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{reason.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Quality Service?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers who trust Sewawala.com
            </p>
            <a
              href="/booking"
              data-testid="about-cta-btn"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all hover:-translate-y-0.5"
            >
              Book a Service Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}