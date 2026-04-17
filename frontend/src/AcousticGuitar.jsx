// frontend/src/AcousticGuitar.tsx
import { useState } from 'react';
import { useAuth } from './provider/authProvider'; // Adjust the import based on your folder structure

function AcousticGuitar({ id, brand, model, numberOfStrings, hasCutaway, price, orderQty, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth(); // Get the isAdmin value from context

    // 1. Local state for "Edit Mode"
    const [isEditing, setIsEditing] = useState(false);
    const [tempBrand, setTempBrand] = useState(brand);
    const [tempModel, setTempModel] = useState(model);
    const [tempNumberOfStrings, setTempNumberOfStrings] = useState(numberOfStrings);
    const [tempHasCutaway, setTempHasCutaway] = useState(hasCutaway);
    const [tempPrice, setTempPrice] = useState(price);

    // 2. Handle Save
    const handleSave = () => {
        const updatedAcousticGuitar = {
            id,
            brand: tempBrand,
            model: tempModel,
            numberOfStrings: tempNumberOfStrings,
            hasCutaway: tempHasCutaway,
            price: parseFloat(tempPrice),
            stock: 1 // For now, keep stock static or add an input for it
        };

        onUpdate(id, updatedAcousticGuitar); // Call the parent function
        setIsEditing(false);               // Exit edit mode
    };

    // 3. Conditional Rendering: EDIT MODE
    if (isEditing) {
        return (
            <div className="acoustic-guitar-row editing" style={{ border: '2px solid #4444ff', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', gap: '10px', backgroundColor: '#eef' }}>
                <input type="text" value={tempBrand} onChange={(e) => setTempBrand(e.target.value)} style={{ flex: 2 }} />
                <input type="text" value={tempModel} onChange={(e) => setTempModel(e.target.value)} style={{ flex: 1 }} />
                <input type="number" value={tempNumberOfStrings} onChange={(e) => setTempNumberOfStrings(e.target.value === '' ? '' : parseInt(e.target.value))} style={{ width: '80px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <label>Cutaway?</label>
                    <select value={tempHasCutaway ? 'yes' : 'no'} onChange={(e) => setTempHasCutaway(e.target.value === 'yes')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '80px' }} />

                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
            </div>
        );
    }

    // 4. Conditional Rendering: VIEW MODE
    return (
        <div className="acoustic-guitar-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="acoustic-guitar-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{brand} {model}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Number of Strings:</strong> {numberOfStrings} | <strong>Has Cutaway:</strong> {hasCutaway ? 'Yes' : 'No'} | <strong>Price:</strong> ${price.toFixed(2)} | <strong>Order Qty:</strong> {orderQty}
                </p>
            </div>

            <div className="acoustic-guitar-actions">
                {isAdmin && (
                    <>
                        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107', marginRight: '5px' }}>Edit</button>
                        <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
                    </>
                )}
                <button onClick={() => onAddToCart(id)} style={{ backgroundColor: '#28a745', color: 'white', marginLeft: '10px' }}>🛒 Add to Cart</button>
            </div>
        </div>
    );
}

export default AcousticGuitar;
