export default function Button({children}) {

    return (
        <button className="mt-8 px-6 py-3 cursor-pointer rounded-full text-acc font-semibold shadow-lg transition-all duration-300 border-2 border-[color:var(--color-acc)] hover:bg-[color:var(--color-acc)] hover:text-white">
            {children || "Acquista Gioco"}
        </button>

    )
};