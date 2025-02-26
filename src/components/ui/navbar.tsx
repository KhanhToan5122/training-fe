export function Navbar() {
    return (
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <span className="text-lg font-semibold">Dashboard</span>
        <div>
          <button className="bg-gray-700 px-4 py-2 rounded">Profile</button>
        </div>
      </nav>
    );
  }
  