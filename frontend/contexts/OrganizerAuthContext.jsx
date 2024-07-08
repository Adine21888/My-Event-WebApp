import React, { createContext, useState, useEffect } from 'react';

export const OrganizerAuthContext = createContext();

const OrganizerAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('organizerToken'));
  const [organizer, setOrganizer] = useState(JSON.parse(localStorage.getItem('organizer')));

  const login = (token, organizer) => {
    localStorage.setItem('organizerToken', token);
    localStorage.setItem('organizer', JSON.stringify(organizer));
    setToken(token);
    setOrganizer(organizer);
  };

  const logout = () => {
    localStorage.removeItem('organizerToken');
    localStorage.removeItem('organizer');
    setToken(null);
    setOrganizer(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('organizerToken');
    const storedOrganizer = JSON.parse(localStorage.getItem('organizer'));

    if (storedToken && storedOrganizer) {
      setToken(storedToken);
      setOrganizer(storedOrganizer);
    }
  }, []);

  return (
    <OrganizerAuthContext.Provider value={{ token, organizer, login, logout }}>
      {children}
    </OrganizerAuthContext.Provider>
  );
};

export default OrganizerAuthProvider;
