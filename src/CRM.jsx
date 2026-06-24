import React, { useState } from 'react';

export default function CRM() {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Ananya Sharma', company: 'TechCorp', stage: 'Lead', email: 'ananya@techcorp.com', value: 5000 },
    { id: 2, name: 'Rahul Verma', company: 'InnoLabs', stage: 'Contacted', email: 'rahul@innolabs.com', value: 12000 },
    { id: 3, name: 'Priya Patel', company: 'DevStudio', stage: 'Proposal', email: 'priya@devstudio.com', value: 8500 },
    { id: 4, name: 'Amit Singh', company: 'GlobalTrade', stage: 'Won', email: 'amit@globaltrade.com', value: 25000 },
  ]);

  const [newLead, setNewLead] = useState({ name: '', company: '', stage: 'Lead', email: '', value: '' });
  const totalPipelineValue = leads.reduce((sum, lead) => sum + Number(lead.value), 0);

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.value) return alert("Please fill out the Name and Deal Value!");
    setLeads([...leads, { ...newLead, id: Date.now(), value: Number(newLead.value) }]);
    setNewLead({ name: '', company: '', stage: 'Lead', email: '', value: '' });
  };

  const updateStage = (id, newStage) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, stage: newStage } : lead));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Enterprise CRM System</h2>
        <p style={{ color: '#6c757d' }}>Manage leads, monitor pipeline stages, and log deal activities.</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #4e73df' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#4e73df' }}>Pipeline Value</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>${totalPipelineValue.toLocaleString()}</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #36b9cc' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#36b9cc' }}>Active Leads</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{leads.length}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 2, backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h3>Sales Pipeline & Deal Stages</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dee2e6', textAlign: 'left', backgroundColor: '#f1f3f5' }}>
                <th style={{ padding: '10px' }}>Contact</th>
                <th style={{ padding: '10px' }}>Company</th>
                <th style={{ padding: '10px' }}>Value</th>
                <th style={{ padding: '10px' }}>Stage</th>
                <th style={{ padding: '10px' }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '10px' }}><strong>{lead.name}</strong><br/><span style={{ fontSize: '11px', color: '#6c757d' }}>{lead.email}</span></td>
                  <td style={{ padding: '10px' }}>{lead.company}</td>
                  <td style={{ padding: '10px' }}>${lead.value.toLocaleString()}</td>
                  <td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', backgroundColor: lead.stage === 'Won' ? '#d4edda' : '#e2e3e5' }}>{lead.stage}</span></td>
                  <td style={{ padding: '10px' }}>
                    <select value={lead.stage} onChange={(e) => updateStage(lead.id, e.target.value)} style={{ padding: '5px' }}>
                      <option value="Lead">Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Won">Won</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
          <h3>Add New Lead</h3>
          <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <input type="text" placeholder="Name" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} style={{ padding: '10px' }} />
            <input type="text" placeholder="Company" value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})} style={{ padding: '10px' }} />
            <input type="email" placeholder="Email" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} style={{ padding: '10px' }} />
            <input type="number" placeholder="Value ($)" value={newLead.value} onChange={e => setNewLead({...newLead, value: e.target.value})} style={{ padding: '10px' }} />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#4e73df', color: '#fff', border: 'none', fontWeight: 'bold' }}>Add Lead</button>
          </form>
        </div>
      </div>
    </div>
  );
}