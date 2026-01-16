const stats = [
    { value: '12,847', label: 'Orders Completed' },
    { value: '483', label: 'Products Available' },
    { value: '4.7', label: 'Avg. Rating' },
    { value: '14', label: 'Shipping Countries' }
];

export default function Stats() {
    return (
        <section className="py-16 bg-[var(--primary)]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-3xl md:text-4xl font-semibold text-white mb-1 tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-sm text-white/70">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
