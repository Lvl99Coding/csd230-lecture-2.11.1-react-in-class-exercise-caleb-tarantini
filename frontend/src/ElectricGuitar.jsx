// frontend/src/ElectricGuitar.tsx
import { useState } from 'react';
import { useAuth } from './provider/authProvider'; // Adjust the path as necessary

function ElectricGuitar({ id, brand, model, numberOfStrings, numberOfPickups, price, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth(); // Get the isAdmin value from context

    // 1. Local state for "Edit Mode"
    const [isEditing, setIsEditing] = useState(false);
    const [tempBrand, setTempBrand] = useState(brand);
    const [tempModel, setTempModel] = useState(model);
    const [tempNumberOfStrings, setTempNumberOfStrings] = useState(numberOfStrings);
    const [tempNumberOfPickups, setTempNumberOfPickups] = useState(numberOfPickups);
    const [tempPrice, setTempPrice] = useState(price);

    // 2. Handle Save
    const handleSave = () => {
        const updatedElectricGuitar = {
            id,
            brand: tempBrand,
            model: tempModel,
            numberOfStrings: tempNumberOfStrings,
            numberOfPickups: tempNumberOfPickups,
            price: parseFloat(tempPrice),
            stock: 1 // For now, keep stock static or add an input for it
        };

        onUpdate(id, updatedElectricGuitar); // Call the parent function
        setIsEditing(false);               // Exit edit mode
    };

    // 3. Conditional Rendering: EDIT MODE
    if (isEditing) {
        return (
            <div className="electric-guitar-row editing">
                <input type="text" value={tempBrand} onChange={(e) => setTempBrand(e.target.value)} style={{ flex: 2 }} />
                <input type="text" value={tempModel} onChange={(e) => setTempModel(e.target.value)} style={{ flex: 1 }} />
                <input type="number" value={tempNumberOfStrings} onChange={(e) => setTempNumberOfStrings(e.target.value === '' ? '' : parseInt(e.target.value))} style={{ width: '80px' }} />
                <input type="number" value={tempNumberOfPickups} onChange={(e) => setTempNumberOfPickups(parseInt(e.target.value))} style={{ width: '80px' }} />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '80px' }} />

                <button onClick={handleSave} className="btn-save">Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    // 4. Conditional Rendering: VIEW MODE
    return (
        <div className="electric-guitar-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="electric-guitar-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{brand} {model}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Number of Strings:</strong> {numberOfStrings} | <strong>Number of Pickups:</strong> {numberOfPickups} | <strong>Price:</strong> ${price.toFixed(2)}
                </p>
            </div>
            <div className="electric-guitar-actions">
                <button onClick={() => onAddToCart(id)} style={{ backgroundColor: '#28a745', color: 'white' }}>
                    🛒 Add to Cart
                </button>
                {isAdmin && (
                    <>
                        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107', marginRight: '5px' }}>Edit</button>
                        <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ElectricGuitar;
