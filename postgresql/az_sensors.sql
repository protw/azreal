CREATE SCHEMA IF NOT EXISTS "az_sensors";

---

CREATE TABLE IF NOT EXISTS "az_sensors"."e_service_kind"
(
    "value"       text PRIMARY KEY,
    "description" text
);
INSERT INTO "az_sensors"."e_service_kind" ("value")
VALUES ('Planned'),
       ('Unscheduled'),
       ('Replacement');

---

CREATE TABLE IF NOT EXISTS "az_sensors"."e_measurement_unit"
(
    "value"       text PRIMARY KEY,
    "description" text
);
INSERT INTO "az_sensors"."e_measurement_unit" ("value", "description")
VALUES ('mgpcm', 'µg/m³'),
       ('celsium', '°C'),
       ('percent', '%'),
       ('hPa', 'hPa'),
       ('kmph', 'km/h'),
       ('degree', '°');

---

CREATE TABLE IF NOT EXISTS "az_sensors"."PollutionFactors"
(
    "name"           text PRIMARY KEY,
    "label"          text NOT NULL,
    "ukrainianLabel" text,
    "unit"           text,
    FOREIGN KEY ("unit")
        REFERENCES "az_sensors"."e_measurement_unit" ("value") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    "maxValue"       double precision
);
INSERT INTO "az_sensors"."PollutionFactors" ("name", "label", "ukrainianLabel", "unit")
VALUES ('PM1', 'PM1', '', 'mgpcm'),
       ('PM25', 'PM2.5', '', 'mgpcm'),
       ('PM10', 'PM10', '', 'mgpcm'),
       ('TEMPERATURE', 'Temperature', 'Температура', 'celsium'),
       ('HUMIDITY', 'Humidity', 'Вологість', 'percent'),
       ('PRESSURE', 'Pressure', 'Тиск', 'hPa'),
       ('WIND_SPEED', 'Wind speed', 'Швидкість вітру', 'kmph'),
       ('WIND_BEARING', 'Wind bearing', 'Напрям вітру', 'degree'),
       ('NO2', 'NO₂', '', 'mgpcm'),
       ('O3', 'O₃', '', 'mgpcm'),
       ('SO2', 'SO₂', '', 'mgpcm'),
       ('CO', 'CO', '', 'mgpcm'),
       ('H2S', 'H₂S', '', 'mgpcm'),
       ('NO', 'NO', '', 'mgpcm');

---

CREATE TABLE IF NOT EXISTS "az_sensors"."Locations"
(
    "locationId"    integer PRIMARY KEY,
    "locationPoint" point            NOT NULL,
    "elevation"     double precision NOT NULL,
    "address"       text,
    "airlyLink"     text,
    "mapsLink"      text,
    "documentId"    integer,
    FOREIGN KEY ("documentId")
        REFERENCES "az_docs"."Documents" ("documentId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

---

CREATE TABLE IF NOT EXISTS "az_sensors"."Sensors"
(
    "sensorId"     integer PRIMARY KEY,
    "locationId"   integer NOT NULL,
    FOREIGN KEY ("locationId")
        REFERENCES "az_sensors"."Locations" ("locationId") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    "isActive"     bool    NOT NULL DEFAULT FALSE,
    "sideNumber"   integer,
    "manufacturer" text,
    "model"        text,
    UNIQUE ("sensorId", "locationId")
);

---

CREATE TABLE IF NOT EXISTS "az_sensors"."SensorFactors"
(
    "sensorId"   integer NOT NULL,
    FOREIGN KEY ("sensorId")
        REFERENCES "az_sensors"."Sensors" ("sensorId") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    "factorName" text    NOT NULL,
    FOREIGN KEY ("factorName")
        REFERENCES "az_sensors"."PollutionFactors" ("name") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY ("sensorId", "factorName")
);

---

CREATE TABLE IF NOT EXISTS "az_sensors"."ServiceLog"
(
    "timestamp"   "timestamp" DEFAULT NOW() NOT NULL,
    "serviceKind" text                      NOT NULL,
    FOREIGN KEY ("serviceKind")
        REFERENCES "az_sensors"."e_service_kind" MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET DEFAULT,
    "sensorId"    integer,
    FOREIGN KEY ("sensorId")
        REFERENCES "az_sensors"."Sensors" ("sensorId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    "documentId"  integer,
    FOREIGN KEY ("documentId")
        REFERENCES "az_docs"."Documents" ("documentId") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    "photoId"     integer,
    FOREIGN KEY ("photoId")
        REFERENCES "az_docs"."Photo" ("photoId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);
