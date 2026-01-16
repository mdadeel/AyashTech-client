export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Browse',
            description: 'Look around. Filter by category or just scroll until something catches your eye.'
        },
        {
            number: '02',
            title: 'Add to Cart',
            description: 'Found something? Add it to your cart. Keep shopping or head to checkout.'
        },
        {
            number: '03',
            title: 'Pay',
            description: 'Card, bKash, Nagad — whatever works for you. Takes about a minute.'
        },
        {
            number: '04',
            title: 'Get It',
            description: 'We ship within 24 hours. Most orders arrive in 3-5 days.'
        }
    ];

    return (
        <section className="section bg-[var(--background-secondary)]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-lg mx-auto mb-16">
                    <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-2">
                        Process
                    </p>
                    <h2 className="heading-lg text-[var(--text-primary)]">
                        How It Works
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-[var(--border)] -translate-x-1/2" />
                            )}

                            <div className="text-center lg:text-left">
                                <span className="inline-block text-4xl font-semibold text-[var(--border)] mb-4">
                                    {step.number}
                                </span>
                                <h3 className="font-medium text-[var(--text-primary)] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
