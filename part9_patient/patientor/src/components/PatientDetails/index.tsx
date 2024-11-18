import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

import { apiBaseUrl } from "../../constants";
import {
  Patient,
  Entry,
  Diagnosis,
} from "../../types";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatientDetails();
    void fetchDiagnoses();
  }, [id]);

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
  };

  const renderDiagnosisCodes = (codes: Array<Diagnosis["code"]>) => (
    <ul>
      {codes.map((code) => {
        const diagnosis = diagnoses.find((d) => d.code === code);
        return (
          <li key={code}>
            <Typography variant="body2" style={{ marginLeft: "0.5em" }}>
              {code} {diagnosis ? `- ${diagnosis.name}` : ""}
            </Typography>
          </li>
        );
      })}
    </ul>
  );

  const renderEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <Card variant="outlined" style={{ marginTop: "1em", padding: "1em", borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                {entry.date} <LocalHospitalIcon fontSize="small" />
              </Typography>
              <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                {entry.description}
              </Typography>
              <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                <strong>Specialist:</strong> {entry.specialist}
              </Typography>
              {entry.discharge && (
                <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                  <strong>Discharge:</strong> {entry.discharge.date} (
                  {entry.discharge.criteria})
                </Typography>
              )}
              {entry.diagnosisCodes && renderDiagnosisCodes(entry.diagnosisCodes)}
            </CardContent>
          </Card>
        );
      case "OccupationalHealthcare":
        return (
          <Card variant="outlined" style={{ marginTop: "1em", padding: "1em", borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                {entry.date} <WorkIcon fontSize="small" />
              </Typography>
              <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                {entry.description}
              </Typography>
              <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                <strong>Specialist:</strong> {entry.specialist}
              </Typography>
              <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                <strong>Employer:</strong> {entry.employerName}
              </Typography>
              {entry.diagnosisCodes && renderDiagnosisCodes(entry.diagnosisCodes)}
            </CardContent>
          </Card>
        );
      case "HealthCheck":
        return (
          <Card variant="outlined" style={{ marginTop: "1em", padding: "1em", borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                {entry.date} <FavoriteIcon fontSize="small" />
              </Typography>
              <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                {entry.description}
              </Typography>
              <Typography variant="body2" style={{ marginTop: "0.5em" }}>
                <strong>Specialist:</strong> {entry.specialist}
              </Typography>
              <FavoriteIcon
                fontSize="small"
                style={{
                  marginTop: "0.5em",
                  color:
                    entry.healthCheckRating === 0
                      ? "green"
                      : entry.healthCheckRating === 1
                      ? "yellow"
                      : entry.healthCheckRating === 2
                      ? "orange"
                      : "red",
                }}
              />
              {entry.diagnosisCodes && renderDiagnosisCodes(entry.diagnosisCodes)}
            </CardContent>
          </Card>
        );
      default:
        return assertNever(entry);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!patient) {
    return (
      <Typography variant="h5" color="error">
        Patient not found
      </Typography>
    );
  }

  const genderIcon =
    patient.gender === "male" ? (
      <MaleIcon />
    ) : patient.gender === "female" ? (
      <FemaleIcon />
    ) : (
      <TransgenderIcon />
    );

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        {patient.name} {genderIcon}
      </Typography>
      <Divider />
      <Typography variant="body1" mt={2}>
        <strong>SSN:</strong> {patient.ssn}
      </Typography>
      <Typography variant="body1" mt={1}>
        <strong>Occupation:</strong> {patient.occupation}
      </Typography>
      <Typography variant="h5" mt={4}>
        Entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography variant="body2" mt={2}>
          No entries found.
        </Typography>
      ) : (
        <List>
          {patient.entries.map((entry) => (
            <ListItem
              key={entry.id}
              style={{ flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}
            >
              {renderEntryDetails(entry)}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PatientDetails;
