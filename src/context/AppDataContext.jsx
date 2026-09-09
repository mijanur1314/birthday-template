import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';

// Import default data
import { config as defaultConfig } from '../data/config';
import { paragraphs as defaultLetter } from '../data/letter';
import { letters as defaultOpenWhen } from '../data/openWhen';
import { polaroids as defaultPolaroids } from '../data/polaroids';
import { promisesList as defaultPromises } from '../data/promises';
import { reasons as defaultReasons } from '../data/reasons';
import { storyPages as defaultStoryPages } from '../data/storyPages';

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultData = {
    config: defaultConfig,
    letter: defaultLetter,
    openWhen: defaultOpenWhen,
    polaroids: defaultPolaroids,
    promises: defaultPromises,
    reasons: defaultReasons,
    storyPages: defaultStoryPages,
    partnerName: "",
    cakeAge: "",
    birthdayDate: "",
    pageOrder: [
      'envelope',
      'letter',
      'story',
      'reasons',
      'promises',
      'openwhen',
      'polaroids',
      'videonote',
      'cake',
      'closing'
    ]
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedSetup = await localforage.getItem('isSetupComplete');
        const storedData = await localforage.getItem('appData');
        
        if (storedSetup && storedData) {
          setData({ ...defaultData, ...storedData });
          setIsSetupComplete(true);
        } else {
          setData(defaultData);
          setIsSetupComplete(false);
        }
      } catch (err) {
        console.error("Failed to load data from localforage", err);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const saveData = async (newData) => {
    try {
      await localforage.setItem('appData', newData);
      await localforage.setItem('isSetupComplete', true);
      setData(newData);
      setIsSetupComplete(true);
    } catch (err) {
      console.error("Failed to save data", err);
    }
  };

  const editData = async () => {
    await localforage.setItem('isSetupComplete', false);
    setIsSetupComplete(false);
  };

  const resetData = async () => {
    await localforage.clear();
    setData(defaultData);
    setIsSetupComplete(false);
  };

  if (loading) return null; // or a tiny spinner

  return (
    <AppDataContext.Provider value={{ data, saveData, editData, resetData, isSetupComplete }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
