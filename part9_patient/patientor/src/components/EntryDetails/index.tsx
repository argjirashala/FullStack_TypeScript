import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "../../types";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <Box>
    <Typography variant="body1">{entry.date} <LocalHospitalIcon /></Typography>
    <Typography variant="body2">{entry.description}</Typography>
    <FavoriteIcon style={{ color: getHealthCheckColor(entry.healthCheckRating) }} />
  </Box>
);

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <Box>
    <Typography variant="body1">{entry.date} <LocalHospitalIcon /></Typography>
    <Typography variant="body2">{entry.description}</Typography>
    <Typography variant="body2">Discharge: {entry.discharge.date} - {entry.discharge.criteria}</Typography>
  </Box>
);

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
  <Box>
    <Typography variant="body1">{entry.date} <WorkIcon /></Typography>
    <Typography variant="body2">{entry.description}</Typography>
    <Typography variant="body2">Employer: {entry.employerName}</Typography>
    {entry.sickLeave && (
      <Typography variant="body2">
        Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </Typography>
    )}
  </Box>
);

const getHealthCheckColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return "gray";
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
