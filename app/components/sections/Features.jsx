import { Shield, Truck, RefreshCw, Headphones } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Free Shipping',
        description: 'Orders over ৳2000 ship free. Usually arrives in 3-5 days.'
    },
    {
        icon: Shield,
        title: 'Secure Checkout',
        description: 'We use SSL encryption. Your card details never touch our servers.'
    },
    {
        icon: RefreshCw,
        title: '30-Day Returns',
        description: 'Changed your mind? Send it back within 30 days, no questions.'
    },
    {
        icon: Headphones,
        title: 'Real Support',
        description: 'Actual humans respond within 24 hours. No chatbots here.'
    }
];

export default function Features() {
    return (
        <section className="section bg-[var(--background-secondary)]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--accent-light)] mb-4">
                                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                                </div>
                                <h3 className="font-medium text-[var(--text-primary)] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
