function StatCard({ title, value, subtitle }) {
    return (
        <div className="stat-card">
            <p className="stat-card-title">{title}</p>
            <h2>{value}</h2>

            {subtitle && (
                <p className="stat-card-subtitle">{subtitle}</p>
            )}
        </div>
    )
}

export default StatCard;