// frontend/src/App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router' // Import routing components
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from "./Magazine";
import MagazineForm from "./MagazineForm";
import ElectricGuitar from './ElectricGuitar.jsx';
import AcousticGuitar from './AcousticGuitar.jsx';
import AcousticGuitarForm from './AcousticGuitarForm.jsx';
import ElectricGuitarForm from './ElectricGuitarForm';
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [electricGuitars, setElectricGuitars] = useState([]);
    const [acousticGuitars, setAcousticGuitars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/magazines")
            .then(res => res.json())
            .then(data => setMagazines(data));
    }, []);

    // Fetch data exactly as before
    useEffect(() => {
        fetch('/api/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch('/api/electricguitars')
            .then(res => res.json())
            .then(data => {
                console.log('Electric Guitars API Response:', data); // Debugging log
                if (Array.isArray(data)) {
                    setElectricGuitars(data);
                } else {
                    console.error('Expected an array but received:', data);
                    setElectricGuitars([]); // Ensure state is always an array
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching electric guitars:', error);
                setElectricGuitars([]); // Set to empty array on error
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch('/api/acousticguitars')
            .then(res => res.json())
            .then(data => {
                console.log('Acoustic Guitars API Response:', data); // Debugging log
                if (Array.isArray(data)) {
                    setAcousticGuitars(data);
                } else {
                    console.error('Expected an array but received:', data);
                    setAcousticGuitars([]); // Ensure state is always an array
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching acoustic guitars:', error);
                setAcousticGuitars([]); // Set to empty array on error
                setLoading(false);
            });
    }, []);

    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    const handleDeleteBook = (id) => {
        if (!window.confirm("Delete this book?")) return;
        fetch(`/api/books/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setBooks(books.filter(b => b.id !== id));
            });
    };

    const handleUpdateBook = (id, updatedData) => {
        fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedBook => {
                setBooks(books.map(b => (b.id === id ? savedBook : b)));
            });
    };

    const handleDeleteMagazine = (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        fetch(`/api/magazines/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setMagazines(magazines.filter(m => m.id !== id));
            });
    };

    const handleUpdateMagazine = (id, updatedData) => {
        fetch(`/api/magazines/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedMagazine => {
                setMagazines(magazines.map(m => (m.id === id ? savedMagazine : m)));
            });
    }

    const handleDeleteAcousticGuitar = (id) => {
        if (!window.confirm("Delete this acoustic guitar?")) return;
        fetch(`/api/acousticguitars/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setAcousticGuitars(acousticGuitars.filter(g => g.id !== id));
            });
    };

    const handleUpdateAcousticGuitar = (id, updatedData) => {
        fetch(`/api/acousticguitars/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedGuitar => {
                setAcousticGuitars(acousticGuitars.map(g => (g.id === id ? savedGuitar : g)));
            });
    };

    const handleDeleteElectricGuitar = (id) => {
        if (!window.confirm("Delete this electric guitar?")) return;
        fetch(`/api/electricguitars/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setElectricGuitars(electricGuitars.filter(g => g.id !== id));
            });
    };

    const handleUpdateElectricGuitar = (id, updatedData) => {
        fetch(`/api/electricguitars/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedGuitar => {
                setElectricGuitars(electricGuitars.map(g => (g.id === id ? savedGuitar : g)));
            });
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            {/* The Navbar stays visible on EVERY page */}
            <Navbar />

            {/* The Routes decide which component to render in this spot */}
            <Routes>
                {/* 1. The Home Page */}
                <Route path="/" element={<Home />} />

                {/* 2. The Inventory Page (Our old main view) */}
                <Route path="/inventory" element={
                    <div className="book-list">
                        <h1>Current Inventory</h1>
                        {books.map((b) => (
                            <Book key={b.id} {...b} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />
                        ))}
                    </div>
                } />

                {/* 3. The Add Book Page */}
                <Route path="/add" element={
                    <div>
                        <h1>Add to Library</h1>
                        <BookForm onBookAdded={handleAddBook} />
                    </div>
                } />

                <Route path="/magazines" element={
                    <div className="magazine-list">
                        <h1>Magazines</h1>
                        {magazines.map((m) => (
                            <Magazine key={m.id} {...m} onDelete={handleDeleteMagazine} onUpdate={handleUpdateMagazine} />
                        ))}
                    </div>
                }
                />

                <Route
                    path="/add-magazine"
                    element={<MagazineForm onMagazineAdded={setMagazines} />}
                />

                <Route path="/electricguitars" element={
                    <div className="electric-guitar-list">
                        <h1>Electric Guitars</h1>
                        {Array.isArray(electricGuitars) ? (
                            electricGuitars.map((g) => (
                                <ElectricGuitar key={g.id} {...g} onDelete={handleDeleteElectricGuitar} onUpdate={handleUpdateElectricGuitar} />
                            ))
                        ) : (
                            <p>No electric guitars available.</p>
                        )}
                    </div>
                } />

                <Route path="/acousticguitars" element={
                    <div className="acoustic-guitar-list">
                        <h1>Acoustic Guitars</h1>
                        {Array.isArray(acousticGuitars) ? (
                            acousticGuitars.map((g) => (
                                <AcousticGuitar key={g.id} {...g} onDelete={handleDeleteAcousticGuitar} onUpdate={handleUpdateAcousticGuitar} />
                            ))
                        ) : (
                            <p>No acoustic guitars available.</p>
                        )}
                    </div>
                } />

                <Route path="/add-electric-guitar" element={<ElectricGuitarForm onElectricGuitarAdded={setElectricGuitars} />} />
                <Route path="/add-acoustic-guitar" element={<AcousticGuitarForm onAcousticGuitarAdded={setAcousticGuitars} />} />
            </Routes>
        </div>
    )
}

export default App