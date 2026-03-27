import { Link } from 'react-router';

function Navbar() {
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
            <Link to="/add" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>➕ Add New Book</Link>
            <Link to="/magazines" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Magazines</Link>
            <Link to="/add-magazine" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Add Magazine</Link>
            <Link to="/electricguitars" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Electric Guitars</Link>
            <Link to="/add-electric-guitar" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Add Electric Guitar</Link>
            <Link to="/acousticguitars" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Acoustic Guitars</Link>
            <Link to="/add-acoustic-guitar" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Add Acoustic Guitar</Link>
        </nav>
    );
}

export default Navbar;