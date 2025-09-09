export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl font-bold mb-4 text-white/90">GameZone</h2>
        <p className="text-sm text-white/60 mb-6">
          © {new Date().getFullYear()} GameZone. Tutti i diritti riservati.
        </p>
        <div className="flex justify-center space-x-6 text-white/50 text-sm">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Termini</a>
          <a href="#" className="hover:text-white transition">Contatti</a>
        </div>
      </div>
    </footer>
  );
}
