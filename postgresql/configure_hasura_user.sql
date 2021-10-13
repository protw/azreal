CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SCHEMA IF NOT EXISTS "hdb_catalog";

CREATE SCHEMA IF NOT EXISTS "hdb_views";

ALTER SCHEMA "hdb_catalog" OWNER TO "hasurauser";

ALTER SCHEMA "hdb_views" OWNER TO "hasurauser";

GRANT SELECT ON
    ALL TABLES IN SCHEMA "information_schema" TO "hasurauser";

GRANT SELECT ON
    ALL TABLES IN SCHEMA "pg_catalog" TO "hasurauser";

GRANT USAGE ON
    SCHEMA "az_docs" TO "hasurauser";

GRANT ALL ON
    ALL TABLES IN SCHEMA "az_docs" TO "hasurauser";

GRANT ALL ON
    ALL SEQUENCES IN SCHEMA "az_docs" TO "hasurauser";

GRANT ALL ON
    ALL FUNCTIONS IN SCHEMA "az_docs" TO "hasurauser";

GRANT USAGE ON
    SCHEMA "az_measurements" TO "hasurauser";

GRANT ALL ON
    ALL TABLES IN SCHEMA "az_measurements" TO "hasurauser";

GRANT ALL ON
    ALL SEQUENCES IN SCHEMA "az_measurements" TO "hasurauser";

GRANT ALL ON
    ALL FUNCTIONS IN SCHEMA "az_measurements" TO "hasurauser";

GRANT USAGE ON
    SCHEMA "az_sensors" TO "hasurauser";

GRANT ALL ON
    ALL TABLES IN SCHEMA "az_sensors" TO "hasurauser";

GRANT ALL ON
    ALL SEQUENCES IN SCHEMA "az_sensors" TO "hasurauser";

GRANT ALL ON
    ALL FUNCTIONS IN SCHEMA "az_sensors" TO "hasurauser";

GRANT USAGE ON
    SCHEMA "az_users" TO "hasurauser";

GRANT ALL ON
    ALL TABLES IN SCHEMA "az_users" TO "hasurauser";

GRANT ALL ON
    ALL SEQUENCES IN SCHEMA "az_users" TO "hasurauser";

GRANT ALL ON
    ALL FUNCTIONS IN SCHEMA "az_users" TO "hasurauser";