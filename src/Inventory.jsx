import React, { useState } from 'react';

export default function Inventory() {
  const [items, setItems] = useState([
    { id: 1, name: 'Logitech Mouse M331', sku: 'LOG-331', stock: 4, minRequired: 10, supplier: 'Logitech India' },
    { id: 2, name: 'Dell 24" Monitor', sku: 'DEL-24M', stock: 15, minRequired: 5, supplier: 'Dell Distribution' },
    { id: 3, name: 'USB-C Cable 1m', sku: 'CAB-USBC', stock: 2, minRequired: 20, supplier: 'CableX Pvt Ltd' },
    { id: 4, name: 'Mechanical Keyboard', sku: 'KEY-MECH', stock: 12, minRequired: 8, supplier: 'Zebronics Ltd' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', sku: '', stock: '', minRequired: '', supplier: '' });
  const lowStockItems = items.filter(item => item.stock <= item.minRequired);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.stock || !newItem.minRequired) return alert("Please fill out required fields!");
    setItems([...items, { ...newItem, id: Date.now(), stock: Number(newItem.stock), minRequired: Number(newItem.minRequired) }]);
    setNewItem({ name: '', sku: '', stock: '', minRequired: '', supplier: '' });
  };

  const restockItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, stock: item.stock + 10 } : item));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fdfefe', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Smart Inventory & Supply Chain System</h2>
        <p style={{ color: '#7f8c8d' }}>Monitor low stock levels, automate reorders, and manage key suppliers.</p>
      </div>

      {lowStockItems.length > 0 && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '6px', marginBottom: '25px', border: '1px solid #f5c6cb' }}>
          <strong>⚠️ Automated Alert: Low Stock Detected!</strong>
          <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
            {lowStockItems.map(item => (
              <li key={item.id}>{item.name} is low! Current: <strong>{item.stock} units</strong></li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, backgroundColor: '#f1f2f6', padding: '15px', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Total Unique SKUs</h4>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{items.length}</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#ffeaa7', padding: '15px', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#d63031' }}>Reorder Alerts</h4>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: '#d63031' }}>{lowStockItems.length} Items</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 2, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eaeded' }}>
          <h3>Stock Level Monitoring</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f6f7', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Item Details</th>
                <th style={{ padding: '10px' }}>SKU</th>
                <th style={{ padding: '10px' }}>Stock / Min</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eaeded' }}>
                  <td style={{ padding: '10px' }}>{item.name}</td>
                  <td style={{ padding: '10px' }}>{item.sku}</td>
                  <td style={{ padding: '10px', color: item.stock <= item.minRequired ? '#d63031' : '#2d3436', fontWeight: 'bold' }}>{item.stock} / {item.minRequired}</td>
                  <td style={{ padding: '10px' }}><button onClick={() => restockItem(item.id)} style={{ padding: '4px 8px', backgroundColor: '#00b894', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+10 Restock</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eaeded' }}>
          <h3>Add New Inventory</h3>
          <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
            <input type="text" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} style={{ padding: '8px' }} />
            <input type="text" placeholder="SKU Code" value={newItem.sku} onChange={e => setNewItem({...newItem, sku: e.target.value})} style={{ padding: '8px' }} />
            <input type="number" placeholder="Current Stock" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} style={{ padding: '8px' }} />
            <input type="number" placeholder="Min Stock Required" value={newItem.minRequired} onChange={e => setNewItem({...newItem, minRequired: e.target.value})} style={{ padding: '8px' }} />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#2f3542', color: '#fff', border: 'none', fontWeight: 'bold' }}>Register Item</button>
          </form>
        </div>
      </div>
    </div>
  );
}