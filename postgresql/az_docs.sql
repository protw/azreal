CREATE SCHEMA IF NOT EXISTS "az_docs";

---

CREATE TABLE IF NOT EXISTS "az_docs"."e_document_type"
(
    "value"       text PRIMARY KEY,
    "description" text
);
INSERT INTO "az_docs"."e_document_type" ("value")
VALUES ('User'),
       ('Organisation'),
       ('Sensor'),
       ('Location'),
       ('Service');

---

CREATE TABLE IF NOT EXISTS "az_docs"."Documents"
(
    "documentId"   serial PRIMARY KEY,
    "documentType" text   NOT NULL,
    FOREIGN KEY ("documentType")
        REFERENCES "az_docs"."e_document_type" ("value") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE SET DEFAULT,
    "fileIds"      text[] NOT NULL
);

---

CREATE TABLE IF NOT EXISTS "az_docs"."Photo"
(
    "photoId" serial PRIMARY KEY,
    "fileIds" text[] NOT NULL
);
