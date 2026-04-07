import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './Navbar';
import Home from './Home';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import Cart from './Cart';
import Login from './pages/Login';       // NEW
import Logout from './pages/Logout';     // NEW
import { ProtectedRoute } from './routes/ProtectedRoute'; // NEW
import { useAuth } from './provider/authProvider';        // NEW
import api from './api/axiosConfig';
import ElectricGuitar from './ElectricGuitar.jsx';
import AcousticGuitar from './AcousticGuitar.jsx';
import AcousticGuitarForm from './AcousticGuitarForm.jsx';
import ElectricGuitarForm from './ElectricGuitarForm';
import './App.css'

function App() {
    const { token } = useAuth(); // Get auth state
    const [cartCount, setCartCount] = useState(0);
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [electricGuitars, setElectricGuitars] = useState([]);
    const [acousticGuitars, setAcousticGuitars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If no token exists, don't attempt to fetch secure data
        if (!token) {
            setLoading(false);
            return;
        }
        const loadInitialData = async () => {
            try {
                const [booksRes, magsRes, electricGuitarsRes, acousticGuitarsRes, cartRes] = await Promise.all([
                    api.get('/books'),
                    api.get('/magazines'),
                    api.get('/electricguitars'), // Correctly fetch electric guitars
                    api.get('/acousticguitars'), // Correctly fetch acoustic guitars
                    api.get('/cart')
                ]);
                setBooks(booksRes.data);
                setMagazines(magsRes.data);
                setElectricGuitars(electricGuitarsRes.data); // Correctly assign electric guitars data
                setAcousticGuitars(acousticGuitarsRes.data); // Correctly assign acoustic guitars data
                setCartCount(cartRes.data.products.length);
            } catch (err) {
                console.error("Failed to load data", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [token]); // Re-run fetch when token changes (i.e., on login)

    const handleAddToCart = async (productId) => { /* keeping your existing code */
        try {
            const res = await api.post(`/cart/add/${productId}`);
            setCartCount(res.data.products.length);
            alert("Added to cart!");
        } catch (err) {
            alert("Error adding to cart");
        }
    };


    const handleDeleteBook = async (id) => { /* keeping your existing code */
        if (!window.confirm("Delete book?")) return;
        await api.delete(`/books/${id}`);
        setBooks(books.filter(b => b.id !== id));
    };
    const handleUpdateBook = async (id, data) => { /* keeping your existing code */
        const res = await api.put(`/books/${id}`, data);
        setBooks(books.map(b => b.id === id ? res.data : b));
    };

    const handleDeleteElectricGuitar = async (id) => {
        await api.delete(`/electricguitars/${id}`);
        setElectricGuitars(electricGuitars.filter(ele => ele.id !== id));
    };

    const handleUpdateElectricGuitar = async (id, data) => {
        const res = await api.put(`/electricguitars/${id}`, data);
        setElectricGuitars(electricGuitars.map(ele => ele.id === id ? res.data : ele));
    };

    const handleDeleteAcousticGuitar = async (id) => {
        await api.delete(`/acousticguitars/${id}`);
        setAcousticGuitars(acousticGuitars.filter(acou => acou.id !== id));
    };

    const handleUpdateAcousticGuitar = async (id, data) => {
        const res = await api.put(`/acousticguitars/${id}`, data);
        setAcousticGuitars(acousticGuitars.map(acou => acou.id === id ? res.data : acou));
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>

            {token && <Navbar cartCount={cartCount} />}

            {/* The Routes decide which component to render in this spot */}
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/inventory" element={
                        <div className="book-list">
                            <h1>Books</h1>
                            {books.map(b => (
                                <Book key={b.id} {...b}
                                      onDelete={handleDeleteBook}
                                      onUpdate={handleUpdateBook}
                                      onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    } />
                    <Route path="/electricguitars" element={
                        <div className="electric-guitar-list">
                            <h1>Electric Guitars</h1>
                            {electricGuitars.map(e => (
                                <ElectricGuitar key={e.id} {...e}
                                          onAddToCart={handleAddToCart}
                                          onDelete={handleDeleteElectricGuitar}
                                          onUpdate={handleUpdateElectricGuitar}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/acousticguitars" element={
                        <div className="acoustic-guitar-list">
                            <h1>Acoustic Guitars</h1>
                            {acousticGuitars.map(a => (
                                <AcousticGuitar key={a.id} {...a}
                                          onAddToCart={handleAddToCart}
                                          onDelete={handleDeleteAcousticGuitar}
                                          onUpdate={handleUpdateAcousticGuitar}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/magazines" element={
                        <div className="magazine-list">
                            <h1>Magazines</h1>
                            {magazines.map(m => (
                                <Magazine key={m.id} {...m}
                                          onAddToCart={handleAddToCart}
                                          onDelete={(id) => api.delete(`/magazines/${id}`).then(() => setMagazines(magazines.filter(mag => mag.id !== id)))}
                                          onUpdate={(id, data) => api.put(`/magazines/${id}`, data).then(res => setMagazines(magazines.map(mag => mag.id === id ? res.data : mag)))}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/cart" element={<Cart api={api} onCartChange={(count) => setCartCount(count)} />} />
                    <Route path="/add" element={<BookForm onBookAdded={(b) => setBooks([...books, b])} api={api} />} />
                    <Route path="/add-magazine" element={<MagazineForm onMagazineAdded={(m) => setMagazines([...magazines, m])} api={api} />} />
                    <Route path="/add-electric-guitar" element={<ElectricGuitarForm onElectricGuitarAdded={(e) => setElectricGuitars([...electricGuitars, e])} api={api} />} />
                    <Route path="/add-acoustic-guitar" element={<AcousticGuitarForm onAcousticGuitarAdded={(a) => setAcousticGuitars([...acousticGuitars, a])} api={api} />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App