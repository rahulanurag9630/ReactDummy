// HospitalDataContext.js
import React, { createContext, useContext, useState } from "react";

const HospitalDataContext = createContext();

export const useHospitalData = () => useContext(HospitalDataContext);

export const HospitalDataProvider = ({ children }) => {
  const [hospitalData, setHospitalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [specializations, setSpecialization] = useState([]);
  const [hospitalId, setHospitalId] = useState(null);

  return (
    <HospitalDataContext.Provider
      value={{
        hospitalData,
        setHospitalData,
        isLoading,
        setIsLoading,
        specializations,
        setSpecialization,
        hospitalId,
        setHospitalId,
      }}
    >
      {children}
    </HospitalDataContext.Provider>
  );
};
