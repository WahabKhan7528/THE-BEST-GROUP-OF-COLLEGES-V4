import { clsx } from "clsx";

const Stats = ({ items, columns = 4, className }) => {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={clsx(
        "grid gap-8 w-full max-w-6xl mx-auto py-24 md:py-32 px-6",
        gridCols[columns],
        className
      )}
    >
      {items.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div key={index} className="text-center group flex flex-col items-center">
            <div className="mb-4 text-college-gold transition-transform group-hover:scale-110">
              {Icon && <Icon className="h-10 w-10" strokeWidth={1.5} />}
            </div>
            <div className="text-4xl md:text-5xl font-serif font-bold mb-2 text-college-navy">
              {stat.value}
            </div>
            <div className="text-gray-600 font-sans uppercase tracking-wider text-sm font-semibold">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
