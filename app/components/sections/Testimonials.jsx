'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        name: 'Fatima Rahman',
        role: 'Regular Customer',
        text: 'Ordered headphones last week - arrived in 3 days. Sound quality is way better than I expected for the price. Already recommended to my friends.'
    },
    {
        name: 'Arjun Patel',
        role: 'Verified Buyer',
        text: 'Was skeptical at first but the watch looks exactly like the photos. The leather strap is genuine, not that cheap fake stuff. Happy with my purchase.'
    },
    {
        name: 'Nadia Hossain',
        role: 'Home Decor Enthusiast',
        text: 'Finally found a place that doesn\'t overpromise. The lamp I bought matches my living room perfectly. Will definitely order the matching set.'
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="section bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-2">
                            Testimonials
                        </p>
                        <h2 className="heading-lg text-[var(--text-primary)]">
                            What Customers Say
                        </h2>
                    </div>

                    {/* Testimonial */}
                    <div className="text-center">
                        <blockquote className="text-xl md:text-2xl text-[var(--text-primary)] font-light leading-relaxed mb-8">
                            "{testimonials[activeIndex].text}"
                        </blockquote>

                        <div className="mb-8">
                            <p className="font-medium text-[var(--text-primary)]">
                                {testimonials[activeIndex].name}
                            </p>
                            <p className="text-sm text-[var(--text-muted)]">
                                {testimonials[activeIndex].role}
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={prev}
                                className="p-2 border border-[var(--border)] rounded-md hover:bg-[var(--background-secondary)] transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
                                            }`}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="p-2 border border-[var(--border)] rounded-md hover:bg-[var(--background-secondary)] transition-colors"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
