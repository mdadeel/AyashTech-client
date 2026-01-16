export default function Logo({ className = "w-8 h-8", classNameText = "text-xl" }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className={`relative flex items-center justify-center ${className} bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl shadow-lg shadow-[var(--primary)]/20`}>
                <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className={`${classNameText} font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] tracking-tight`}>
                Ayash Tech
            </span>
        </div>
    );
}
