import {
    NewEntry,
    HealthCheckRating,
} from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseStringField = (field: unknown, fieldName: string): string => {
    if (!field || !isString(field)) {
        throw new Error(`Invalid or missing ${fieldName}`);
    }
    return field;
};

const parseDateField = (field: unknown, fieldName: string): string => {
    if (!field || !isString(field) || !isDate(field)) {
        throw new Error(`Invalid or missing ${fieldName}`);
    }
    return field;
};

const parseDiagnosisCodes = (object: unknown): Array<string> => {
    if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
        return [] as Array<string>;
    }
    return object.diagnosisCodes as Array<string>;
};

const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Invalid or missing entry data");
    }

    const baseEntry = {
        description: parseStringField((object as any).description, "description"),
        date: parseDateField((object as any).date, "date"),
        specialist: parseStringField((object as any).specialist, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch ((object as { type: string }).type) {
        case "HealthCheck":
            return {
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: isHealthCheckRating((object as any).healthCheckRating)
                    ? (object as any).healthCheckRating
                    : (() => {
                          throw new Error("Invalid or missing healthCheckRating");
                      })(),
            };
        case "Hospital":
            return {
                ...baseEntry,
                type: "Hospital",
                discharge: {
                    date: parseDateField(
                        (object as any).discharge?.date,
                        "discharge.date"
                    ),
                    criteria: parseStringField(
                        (object as any).discharge?.criteria,
                        "discharge.criteria"
                    ),
                },
            };
        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                type: "OccupationalHealthcare",
                employerName: parseStringField(
                    (object as any).employerName,
                    "employerName"
                ),
                sickLeave:
                    (object as any).sickLeave && typeof (object as any).sickLeave === "object"
                        ? {
                              startDate: parseDateField(
                                  (object as any).sickLeave?.startDate,
                                  "sickLeave.startDate"
                              ),
                              endDate: parseDateField(
                                  (object as any).sickLeave?.endDate,
                                  "sickLeave.endDate"
                              ),
                          }
                        : undefined,
            };
        default:
            throw new Error("Invalid or missing entry type");
    }
};

export default toNewEntry;
