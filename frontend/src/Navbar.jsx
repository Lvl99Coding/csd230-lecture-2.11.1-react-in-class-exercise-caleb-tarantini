import { Link } from 'react-router';
import { useAuth } from './provider/authProvider';
import { useState } from 'react';

function Navbar({ cartCount }) {
    const { isAdmin } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#222',
            color: 'white',
            marginBottom: '20px',
            display: 'flex',
            gap: '30px',
            borderRadius: '8px'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Home</Link>
            <Link to="/inventory" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>📚 View Inventory</Link>
            <Link to="/magazines" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>📰Magazines</Link>
            <Link to="/cart">🛒 Cart ({cartCount})</Link>
            <Link to="/electricguitars" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🎸 Electric Guitars</Link>
            <Link to="/acousticguitars" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🎻 Acoustic Guitars</Link>

            {isAdmin && (
                <div style={{ position: 'relative' }}>
                    <button onClick={toggleDropdown} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                        ➕ Add Operations
                    </button>
                    {dropdownOpen && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#333', borderRadius: '8px', padding: '10px', zIndex: 100 }}>
                            <Link to="/add" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '5px' }}>➕ Add New Book</Link>
                            <Link to="/add-magazine" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '5px' }}>➕ Add Magazine</Link>
                            <Link to="/add-electric-guitar" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '5px' }}>➕ Add Electric Guitar</Link>
                            <Link to="/add-acoustic-guitar" style={{ display: 'block', color: 'white', textDecoration: 'none' }}>➕ Add Acoustic Guitar</Link>
                        </div>
                    )}
                </div>
            )}

            <Link to="/logout" style={{ color: "#ff4444", marginLeft: "auto" }}> Logout</Link>
        </nav>
    );
}

export default Navbar;