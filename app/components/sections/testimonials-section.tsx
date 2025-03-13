export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners who are exploring Africa through our interactive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "This app has completely transformed how I teach African geography to my students. The interactive quizzes are engaging and informative.",
              author: "Sarah M.",
              role: "Geography Teacher",
              location: "United Kingdom",
            },
            {
              quote:
                "As someone with African heritage, I appreciate how this platform celebrates the continent's diversity and rich cultural traditions.",
              author: "Kwame A.",
              role: "Student",
              location: "Ghana",
            },
            {
              quote:
                "The wildlife section is amazing! I've learned so much about conservation efforts and the incredible biodiversity across Africa.",
              author: "Emma L.",
              role: "Wildlife Enthusiast",
              location: "Canada",
            },
          ].map((testimonial, i) => (
            <div key={i} className="bg-background rounded-xl border p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#F59E0B"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="italic mb-6 text-muted-foreground">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.author[0]}
                </div>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

