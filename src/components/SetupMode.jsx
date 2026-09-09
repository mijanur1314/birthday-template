import React, { useState, useRef } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Camera, Check, Settings, EyeOff } from 'lucide-react';

export default function SetupMode() {
  const { data, saveData } = useAppData();
  const [formData, setFormData] = useState(data);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    saveData(formData);
  };

  const handleImageUpload = (e, section, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const newData = { ...formData };
        if (section === 'polaroids') {
          newData.polaroids[index].image = base64String;
        } else if (section === 'reasons') {
          newData.reasons[index].image = base64String;
        } else if (section === 'storyPages') {
          newData.storyPages[index].image = base64String;
        }
        setFormData(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePage = (page) => {
    const pages = [...formData.pageOrder];
    if (pages.includes(page)) {
      setFormData({ ...formData, pageOrder: pages.filter(p => p !== page) });
    } else {
      setFormData({ ...formData, pageOrder: [...pages, page] });
    }
  };

  return (
    <div className="setup-container" style={{ padding: '2rem', minHeight: '100vh', background: '#f8f9fa', color: '#333' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'serif' }}>App Setup Mode</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className={activeTab === 'general' ? 'active-tab' : ''} onClick={() => setActiveTab('general')}>General & Pages</button>
        <button className={activeTab === 'letter' ? 'active-tab' : ''} onClick={() => setActiveTab('letter')}>Letter</button>
        <button className={activeTab === 'polaroids' ? 'active-tab' : ''} onClick={() => setActiveTab('polaroids')}>Photos</button>
        <button className={activeTab === 'reasons' ? 'active-tab' : ''} onClick={() => setActiveTab('reasons')}>Reasons</button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        {activeTab === 'general' && (
          <div>
            <h3>Basic Settings</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Partner's Name</label>
                <input 
                  type="text" 
                  value={formData.partnerName} 
                  onChange={e => setFormData({...formData, partnerName: e.target.value})}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ width: '100px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Age</label>
                <input 
                  type="text" 
                  maxLength={2}
                  value={formData.cakeAge || "23"} 
                  onChange={e => setFormData({...formData, cakeAge: e.target.value.replace(/\D/g, '')})}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
            </div>
            
            <h3 style={{ marginTop: '2rem' }}>Enable/Disable Pages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['envelope', 'letter', 'story', 'reasons', 'promises', 'openwhen', 'polaroids', 'videonote', 'cake', 'closing'].map(page => (
                <label key={page} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.pageOrder.includes(page)} 
                    onChange={() => togglePage(page)}
                  />
                  <span style={{ textTransform: 'capitalize' }}>{page} Page</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'letter' && (
          <div>
            <h3>Your Letter Paragraphs</h3>
            {formData.letter.map((para, i) => (
              <textarea 
                key={i}
                value={para}
                onChange={e => {
                  const newLetter = [...formData.letter];
                  newLetter[i] = e.target.value;
                  setFormData({...formData, letter: newLetter});
                }}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1rem', minHeight: '100px' }}
              />
            ))}
          </div>
        )}

        {activeTab === 'polaroids' && (
          <div>
            <h3>Polaroid Photos & Captions</h3>
            {formData.polaroids.map((item, i) => (
              <div key={i} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '100px', height: '100px', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                    {item.image && item.image !== '/placeholder.svg' ? (
                      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}><Camera /></div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => handleImageUpload(e, 'polaroids', i)}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <input 
                      type="text" 
                      value={item.caption} 
                      onChange={e => {
                        const newData = [...formData.polaroids];
                        newData[i].caption = e.target.value;
                        setFormData({...formData, polaroids: newData});
                      }}
                      placeholder="Short Caption"
                      style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <textarea 
                      value={item.longCaption} 
                      onChange={e => {
                        const newData = [...formData.polaroids];
                        newData[i].longCaption = e.target.value;
                        setFormData({...formData, polaroids: newData});
                      }}
                      placeholder="Long description when clicked"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reasons' && (
          <div>
            <h3>Reasons I Love You</h3>
            {formData.reasons.map((item, i) => (
              <div key={i} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', display: 'flex', gap: '1rem' }}>
                 <div style={{ width: '80px', height: '80px', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                    {item.image && item.image !== '/placeholder.svg' ? (
                      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}><Camera /></div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => handleImageUpload(e, 'reasons', i)}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                  <textarea 
                    value={item.text} 
                    onChange={e => {
                      const newData = [...formData.reasons];
                      newData[i].text = e.target.value;
                      setFormData({...formData, reasons: newData});
                    }}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                  />
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={handleSave}
            style={{ padding: '1rem 3rem', fontSize: '1.2rem', background: '#ff4d6d', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Check size={20} /> Save & Lock Gift App
          </button>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            Note: Once you lock, the app will act like the final gift. (To reset later, double tap the bottom right corner of the first screen).
          </p>
        </div>

      </div>
    </div>
  );
}
