import Link from 'next/link';
import { Star } from 'lucide-react';

const ProductImage = ({ src, alt, category }) => (
    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--background-secondary)]">
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-[var(--card)] text-[var(--text-secondary)] rounded-md border border-[var(--border)]">
            {category}
        </span>
    </div>
);

const ProductRating = ({ rating }) => (
    <div className="flex items-center gap-1.5 mb-2">
        <Star className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
        <span className="text-xs text-[var(--text-secondary)]">
            {rating || '4.5'}
        </span>
    </div>
);

const ProductPrice = ({ price, stock }) => (
    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <span className="text-lg font-semibold text-[var(--text-primary)]">
            ${price?.toFixed(2)}
        </span>
        <span className={`text-xs ${stock > 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
            {stock > 0 ? 'In stock' : 'Sold out'}
        </span>
    </div>
);

export default function ProductCard({ item }) {
    return (
        <Link href={`/items/${item.id}`}>
            <article className="card group overflow-hidden cursor-pointer h-full flex flex-col">
                <ProductImage 
                    src={item.image} 
                    alt={item.name} 
                    category={item.category} 
                />

                <div className="p-5 flex-1 flex flex-col">
                    <ProductRating rating={item.rating} />

                    <h3 className="font-medium text-[var(--text-primary)] mb-1.5 line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
                        {item.name}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 flex-1">
                        {item.description}
                    </p>

                    <ProductPrice price={item.price} stock={item.stock} />
                </div>
            </article>
        </Link>
    );
}
