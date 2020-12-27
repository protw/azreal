CREATE SCHEMA IF NOT EXISTS "az_users";

---

CREATE TABLE IF NOT EXISTS "az_users"."Organisation"
(
    "organisationId"   serial PRIMARY KEY,
    "fullName"         text NOT NULL,
    "shortName"        text,
    "country"          text,
    "rntrc"            text NOT NULL,
    CHECK (length("rntrc") = 8),
    "organisationRole" text,
    "documentId"       integer,
    FOREIGN KEY ("documentId")
        REFERENCES "az_docs"."Documents" ("documentId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    UNIQUE ("rntrc")
);

---

CREATE TABLE IF NOT EXISTS "az_users"."Users"
(
    "userId"         serial PRIMARY KEY,
    "fullName"       text,
    "email"          text NOT NULL,
    "phoneNumber"    text,
    "organisationId" integer,
    FOREIGN KEY ("organisationId")
        REFERENCES "az_users"."Organisation" ("organisationId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    "userRole"       text,
    "documentId"     integer,
    FOREIGN KEY ("documentId")
        REFERENCES "az_docs"."Documents" ("documentId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    UNIQUE ("email"),
    UNIQUE ("phoneNumber")
);

---

CREATE TABLE IF NOT EXISTS "az_users"."AuthData"
(
    "userId"   serial PRIMARY KEY,
    FOREIGN KEY ("userId")
        REFERENCES "az_users"."Users" ("userId") MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    "password" text NOT NULL
);

---

CREATE TABLE IF NOT EXISTS "az_users"."UsageLog"
(
    "timestamp" timestamp NOT NULL DEFAULT NOW(),
    "userId"    integer,
    FOREIGN KEY ("userId")
        REFERENCES "az_users"."Users" ("userId") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    "query"     text      NOT NULL,
    "queryType" char(6)   NOT NULL
);
