export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">CD</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Community Dictionary
              </h1>
              <p className="text-xs text-gray-500">Tai Khamyang Dictionary</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-sm text-gray-700 hover:text-primary-600">
              Home
            </a>
            <a href="#about" className="text-sm text-gray-700 hover:text-primary-600">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
