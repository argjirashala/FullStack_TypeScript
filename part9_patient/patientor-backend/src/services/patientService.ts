import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import { Patient, NewPatient, Entry, NewEntry } from "../types";

const patients: Patient[] = data as Patient[];

const getPatients = (): Patient[] => {
  return patients;
};


const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id = uuid();
  const patient = {
    id,
    ...newPatient,
    entries: [], 
  };

  patients.push(patient);
  return patient;
};

const addEntry = (id: string, newEntry: NewEntry): Entry | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }

  let entry: Entry;

  switch (newEntry.type) {
    case "HealthCheck":
      if ("healthCheckRating" in newEntry) {
        entry = {
          id: uuid(),
          ...newEntry,
        } as Entry;
      } else {
        throw new Error("Missing required field: healthCheckRating for HealthCheckEntry");
      }
      break;

    case "Hospital":
      if ("discharge" in newEntry) {
        entry = {
          id: uuid(),
          ...newEntry,
        } as Entry;
      } else {
        throw new Error("Missing required field: discharge for HospitalEntry");
      }
      break;

    case "OccupationalHealthcare":
      if ("employerName" in newEntry) {
        entry = {
          id: uuid(),
          ...newEntry,
        } as Entry;
      } else {
        throw new Error("Missing required field: employerName for OccupationalHealthcareEntry");
      }
      break;

    default:
      throw new Error(`Unhandled entry type: ${(newEntry as Entry).type}`);
  }

  patient.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  getPatientById, 
  addPatient,
  addEntry,
};
