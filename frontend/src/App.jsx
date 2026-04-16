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
import Ticket from './Ticket';
import TicketForm from './TicketForm';
import DiscMag from './DiscMag';
import DiscMagForm from './DiscMagForm';
import ComicBook from './ComicBook';
import ComicBookForm from './ComicBookForm';
import Tablet from './Tablet';
import TabletForm from './TabletForm';
import './App.css'

function App() {
    const { token } = useAuth(); // Get auth state
    const [cartCount, setCartCount] = useState(0);
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [electricGuitars, setElectricGuitars] = useState([]);
    const [acousticGuitars, setAcousticGuitars] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [discMags, setDiscMags] = useState([]);
    const [comicBooks, setComicBooks] = useState([]);
    const [tablets, setTablets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If no token exists, don't attempt to fetch secure data
        if (!token) {
            setLoading(false);
            return;
        }
        const loadInitialData = async () => {
            try {
                const [booksRes, magsRes, electricGuitarsRes, acousticGuitarsRes, cartRes, ticketsRes, discMagsRes, comicBooksRes, tabletsRes] = await Promise.all([
                    api.get('/books'),
                    api.get('/magazines'),
                    api.get('/electricguitars'), // Correctly fetch electric guitars
                    api.get('/acousticguitars'), // Correctly fetch acoustic guitars
                    api.get('/cart'),
                    api.get('/tickets'),
                    api.get('/discmags'),
                    api.get('/comicbooks'),
                    api.get('/tablets')
                ]);
                setBooks(booksRes.data);
                setMagazines(magsRes.data);
                setElectricGuitars(electricGuitarsRes.data); // Correctly assign electric guitars data
                setAcousticGuitars(acousticGuitarsRes.data); // Correctly assign acoustic guitars data
                setCartCount(cartRes.data.products.length);
                setTickets(ticketsRes.data);
                setDiscMags(discMagsRes.data);
                setComicBooks(comicBooksRes.data);
                setTablets(tabletsRes.data);
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
        if (!window.confirm("Delete guitar?")) return;
        await api.delete(`/electricguitars/${id}`);
        setElectricGuitars(electricGuitars.filter(ele => ele.id !== id));
    };

    const handleUpdateElectricGuitar = async (id, data) => {
        const res = await api.put(`/electricguitars/${id}`, data);
        setElectricGuitars(electricGuitars.map(ele => ele.id === id ? res.data : ele));
    };

    const handleDeleteAcousticGuitar = async (id) => {
        if (!window.confirm("Delete guitar?")) return;
        await api.delete(`/acousticguitars/${id}`);
        setAcousticGuitars(acousticGuitars.filter(acou => acou.id !== id));
    };

    const handleUpdateAcousticGuitar = async (id, data) => {
        const res = await api.put(`/acousticguitars/${id}`, data);
        setAcousticGuitars(acousticGuitars.map(acou => acou.id === id ? res.data : acou));
    };

    const handleDeleteTicket = async (id) => {
        if (!window.confirm("Delete ticket?")) return;
        await api.delete(`/tickets/${id}`);
        setTickets(tickets.filter(t => t.id !== id));
    };

    const handleUpdateTicket = async (id, data) => {
        const res = await api.put(`/tickets/${id}`, data);
        setTickets(tickets.map(t => t.id === id ? res.data : t));
    };

    const handleDeleteDiscMag = async (id) => {
        if (!window.confirm("Delete DiscMag?")) return;
        await api.delete(`/discmags/${id}`);
        setDiscMags(discMags.filter(d => d.id !== id));
    };

    const handleUpdateDiscMag = async (id, data) => {
        console.log("Updating DiscMag with data:", data); // Log the payload
        const res = await api.put(`/discmags/${id}`, data);
        setDiscMags(discMags.map(d => d.id === id ? res.data : d));
    };

    const handleDeleteMagazine = async (id) => {
        if (!window.confirm("Delete magazine?")) return;
        await api.delete(`/magazines/${id}`);
        setMagazines(magazines.filter(mag => mag.id !== id));
    };

    const handleUpdateMagazine = async (id, data) => {
        const res = await api.put(`/magazines/${id}`, data);
        setMagazines(magazines.map(mag => mag.id === id ? res.data : mag));
    };

    const handleDeleteComicBook = async (id) => {
        if (!window.confirm("Delete comic book?")) return;
        await api.delete(`/comicbooks/${id}`);
        setComicBooks(comicBooks.filter(cb => cb.id !== id));
    };

    const handleUpdateComicBook = async (id, data) => {
        const res = await api.put(`/comicbooks/${id}`, data);
        setComicBooks(comicBooks.map(cb => cb.id === id ? res.data : cb));
    };

    const handleDeleteTablet = async (id) => {
        if (!window.confirm("Delete tablet?")) return;
        await api.delete(`/tablets/${id}`);
        setTablets(tablets.filter(tab => tab.id !== id));
    };

    const handleUpdateTablet = async (id, data) => {
        const res = await api.put(`/tablets/${id}`, data);
        setTablets(tablets.map(tab => tab.id === id ? res.data : tab));
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '1500px', margin: '0 auto', padding: '20px' }}>

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
                                          onDelete={handleDeleteMagazine}
                                          onUpdate={handleUpdateMagazine}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/cart" element={<Cart api={api} onCartChange={(count) => setCartCount(count)} />} />
                    <Route path="/add" element={<BookForm onBookAdded={(b) => setBooks([...books, b])} api={api} />} />
                    <Route path="/add-magazine" element={<MagazineForm onMagazineAdded={(m) => setMagazines([...magazines, m])} api={api} />} />
                    <Route path="/add-electric-guitar" element={<ElectricGuitarForm onElectricGuitarAdded={(e) => setElectricGuitars([...electricGuitars, e])} api={api} />} />
                    <Route path="/add-acoustic-guitar" element={<AcousticGuitarForm onAcousticGuitarAdded={(a) => setAcousticGuitars([...acousticGuitars, a])} api={api} />} />
                    <Route path="/tickets" element={
                        <div className="ticket-list">
                            <h1>Tickets</h1>
                            {tickets.map(t => (
                                <Ticket key={t.id} {...t}
                                        onAddToCart={handleAddToCart}
                                        onDelete={handleDeleteTicket}
                                        onUpdate={handleUpdateTicket}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/discmags" element={
                        <div className="discmag-list">
                            <h1>DiscMags</h1>
                            {discMags.map(d => (
                                <DiscMag key={d.id} {...d}
                                         onAddToCart={handleAddToCart}
                                         onDelete={handleDeleteDiscMag}
                                         onUpdate={handleUpdateDiscMag}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/add-ticket" element={<TicketForm onTicketAdded={(t) => setTickets([...tickets, t])} api={api} />} />
                    <Route path="/add-discmag" element={<DiscMagForm onDiscMagAdded={(d) => setDiscMags([...discMags, d])} api={api} />} />
                    <Route path="/comicbooks" element={
                        <div className="comicbook-list">
                            <h1>Comic Books</h1>
                            {comicBooks.map(cb => (
                                <ComicBook key={cb.id} {...cb}
                                          onAddToCart={handleAddToCart}
                                          onDelete={handleDeleteComicBook}
                                          onUpdate={handleUpdateComicBook}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/add-comicbook" element={<ComicBookForm onComicBookAdded={(cb) => setComicBooks([...comicBooks, cb])} api={api} />} />
                    <Route path="/tablets" element={
                        <div className="tablet-list">
                            <h1>Tablets</h1>
                            {tablets.map(tab => (
                                <Tablet key={tab.id} {...tab}
                                       onAddToCart={handleAddToCart}
                                       onDelete={handleDeleteTablet}
                                       onUpdate={handleUpdateTablet}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/add-tablet" element={<TabletForm onTabletAdded={(tab) => setTablets([...tablets, tab])} api={api} />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App