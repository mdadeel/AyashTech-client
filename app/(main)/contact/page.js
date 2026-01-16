'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Contact Us</h1>
                    <p className="text-lg text-[var(--text-secondary)] mb-12">
                        Have a question or feedback? We'd love to hear from you.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="input resize-none"
                                        placeholder="Tell us more..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-[var(--accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">Email</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">support@ayashtech.com</p>
                                        <p className="text-sm text-[var(--text-secondary)]">sales@ayashtech.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-[var(--accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">Phone</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">+1 (555) 123-4567</p>
                                        <p className="text-xs text-[var(--text-muted)]">Mon-Fri 9am-6pm EST</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-[var(--accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">Address</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">
                                            123 Commerce Street<br />
                                            Suite 100<br />
                                            New York, NY 10001
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
