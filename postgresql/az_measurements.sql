CREATE SCHEMA IF NOT EXISTS "az_measurements";

---

CREATE TABLE IF NOT EXISTS "az_measurements"."Measurements"
(
    "sensorId"      integer,
    FOREIGN KEY ("sensorId")
        REFERENCES "az_sensors"."Sensors" ("sensorId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    "locationPoint" point            NOT NULL,
    "timestamp"     timestamp        NOT NULL,
    "factorName"    text             NOT NULL,
    FOREIGN KEY ("factorName")
        REFERENCES "az_sensors"."PollutionFactors" ("name") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    "value"         double precision NOT NULL,
    "CAQI"          double precision NOT NULL DEFAULT 0,

    UNIQUE ("sensorId", "timestamp", "factorName")
);
