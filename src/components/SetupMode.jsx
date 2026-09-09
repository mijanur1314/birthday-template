import React, { useState, useRef } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Camera, Check, Settings, EyeOff } from 'lucide-react';
import '../styles/setup.css';

export default function SetupMode() {
  const { data, updateData, completeSetup } = useAppData();
  const [activeTab, setActiveTab] = useState('instructions');
  const [formData, setFormData] = useState(data || {
    partnerName: "",
    cakeAge: "23",
    pageOrder: ['envelope', 'letter', 'story', 'reasons', 'promises', 'openwhen', 'polaroids', 'videonote', 'cake', 'closing'],
    storyPages: [],
    reasons: [],
    openWhen: [],
    polaroids: [],
    promises: []
  });

  const handleSave = () => {
    updateData(formData);
    completeSetup();
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
    <div className="setup-container">
      <div className="setup-header">
        <h1>Gift Setup Mode</h1>
        <p>Customize the app with your own photos and text before giving it to your partner!</p>
      </div>

      <div className="setup-tabs">
        <button className={activeTab === 'instructions' ? 'active-tab' : ''} onClick={() => setActiveTab('instructions')}>How To Use 📖</button>
        <button className={activeTab === 'general' ? 'active-tab' : ''} onClick={() => setActiveTab('general')}>General & Pages</button>
        <button className={activeTab === 'letter' ? 'active-tab' : ''} onClick={() => setActiveTab('letter')}>Letter</button>
        <button className={activeTab === 'polaroids' ? 'active-tab' : ''} onClick={() => setActiveTab('polaroids')}>Photos</button>
        <button className={activeTab === 'reasons' ? 'active-tab' : ''} onClick={() => setActiveTab('reasons')}>Reasons</button>
      </div>

      <div className="setup-card">
        
        {activeTab === 'instructions' && (
          <div>
            <h2>Welcome to Your Custom Birthday Gift! 🎁</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              You are currently in <strong>Setup Mode</strong>. This screen will only be seen by YOU. Once you fill everything out and save it, this screen will disappear and the app will turn into a beautiful cinematic gift for your partner.
            </p>
            
            <h3>🛠️ How to Customize</h3>
            <ul className="setup-instruction-list">
              <li><strong>General & Pages:</strong> Type your partner's name, their age for the birthday cake, and uncheck any pages you don't want to show.</li>
              <li><strong>Letter:</strong> Write a custom love letter that will type itself out on the screen.</li>
              <li><strong>Photos & Reasons:</strong> Tap the empty photo boxes to open your phone's camera roll and upload your favorite couple pictures. You can also write sweet captions for each photo!</li>
            </ul>

            <h3>🔒 How to Save & Give the Gift</h3>
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              Once you are happy with everything, scroll to the bottom of this page and tap the pink <strong>"Save & Lock Gift"</strong> button. The app will immediately transform into the actual gift. You can then hand your phone to your partner!
            </p>

            <div className="setup-warning">
              <strong style={{ fontSize: '1.1rem', color: 'var(--magenta)', display: 'block', marginBottom: '0.5rem' }}>⚠️ Oh no, I made a mistake!</strong>
              If you already clicked "Save & Lock" but need to fix a typo or change a photo, don't panic! <br/><br/>
              <strong>Just tap the absolute bottom-right corner of your phone screen.</strong> There is a secret invisible button hidden there that will instantly reset the app and bring this Setup Mode back!
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div>
            <h2>Basic Settings</h2>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div className="setup-input-group" style={{ flex: '1 1 300px' }}>
                <label>Partner's Name</label>
                <input 
                  type="text" 
                  className="setup-input"
                  value={formData.partnerName} 
                  onChange={e => setFormData({...formData, partnerName: e.target.value})}
                  placeholder="e.g. Sarah"
                />
              </div>
              <div className="setup-input-group" style={{ width: '120px' }}>
                <label>Age (Cake)</label>
                <input 
                  type="text" 
                  className="setup-input"
                  maxLength={2}
                  value={formData.cakeAge || "23"} 
                  onChange={e => setFormData({...formData, cakeAge: e.target.value.replace(/\D/g, '')})}
                />
              </div>
            </div>
            
            <h3 style={{ marginTop: '2rem' }}>Enable or Disable Pages</h3>
            <div className="setup-checkbox-list">
              {['envelope', 'letter', 'story', 'reasons', 'promises', 'openwhen', 'polaroids', 'videonote', 'cake', 'closing'].map(page => (
                <label key={page} className="setup-checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={formData.pageOrder.includes(page)} 
                    onChange={() => togglePage(page)}
                  />
                  <span>{page} Page</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'letter' && (
          <div>
            <h2>Your Love Letter</h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>This letter will magically type itself out on the screen like a typewriter.</p>
            {formData.letter && formData.letter.map((para, i) => (
              <div className="setup-input-group" key={i}>
                <label>Paragraph {i + 1}</label>
                <textarea 
                  className="setup-input setup-textarea"
                  value={para}
                  onChange={e => {
                    const newLetter = [...formData.letter];
                    newLetter[i] = e.target.value;
                    setFormData({...formData, letter: newLetter});
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'polaroids' && (
          <div>
            <h2>Polaroid Photos & Captions</h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>Upload photos for the interactive polaroid wall. Click a photo box to select from your phone.</p>
            {formData.polaroids.map((item, i) => (
              <div key={i} className="setup-photo-item">
                <div className="setup-photo-upload">
                  {item.image && item.image !== '/placeholder.svg' ? (
                    <>
                      <img src={item.image} alt="" />
                      <div className="setup-photo-overlay"><Camera /></div>
                    </>
                  ) : (
                    <div style={{ color: '#aaa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Camera size={32} style={{ marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.8rem' }}>Upload</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleImageUpload(e, 'polaroids', i)}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
                  />
                </div>
                
                <div style={{ flex: 1, width: '100%' }}>
                  <div className="setup-input-group" style={{ marginBottom: '1rem' }}>
                    <label>Short Caption (Written on Polaroid)</label>
                    <input 
                      type="text" 
                      className="setup-input"
                      value={item.caption} 
                      onChange={e => {
                        const newData = [...formData.polaroids];
                        newData[i].caption = e.target.value;
                        setFormData({...formData, polaroids: newData});
                      }}
                      placeholder="e.g. Our first date"
                    />
                  </div>
                  <div className="setup-input-group" style={{ marginBottom: '0' }}>
                    <label>Long Description (Revealed when clicked)</label>
                    <textarea 
                      className="setup-input"
                      style={{ minHeight: '80px', resize: 'vertical' }}
                      value={item.longCaption} 
                      onChange={e => {
                        const newData = [...formData.polaroids];
                        newData[i].longCaption = e.target.value;
                        setFormData({...formData, polaroids: newData});
                      }}
                      placeholder="Write a sweet memory about this photo..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reasons' && (
          <div>
            <h2>Reasons I Love You</h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>These will appear as beautiful interactive flip-cards.</p>
            {formData.reasons.map((item, i) => (
              <div key={i} className="setup-photo-item">
                <div className="setup-photo-upload" style={{ width: '100px', height: '100px' }}>
                  {item.image && item.image !== '/placeholder.svg' ? (
                    <>
                      <img src={item.image} alt="" />
                      <div className="setup-photo-overlay"><Camera /></div>
                    </>
                  ) : (
                    <div style={{ color: '#aaa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Camera size={24} style={{ marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.8rem' }}>Upload</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleImageUpload(e, 'reasons', i)}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
                  />
                </div>
                
                <div className="setup-input-group" style={{ flex: 1, margin: 0, width: '100%' }}>
                  <label>Reason #{i + 1}</label>
                  <textarea 
                    className="setup-input"
                    style={{ minHeight: '80px', resize: 'vertical' }}
                    value={item.text} 
                    onChange={e => {
                      const newData = [...formData.reasons];
                      newData[i].text = e.target.value;
                      setFormData({...formData, reasons: newData});
                    }}
                    placeholder="Because you always make me smile..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="save-lock-btn" onClick={handleSave}>
          <Check size={24} /> Save & Lock Gift App
        </button>

      </div>
    </div>
  );
}
