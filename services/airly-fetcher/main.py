from pSQL import query_db
from pars import parse_airly_measurements
from utils import parse_str_to_timestamp


def main():
    result = query_db(query='SELECT "sensorId", "locationPoint" FROM "az_sensors"."Sensors" '
                            'INNER JOIN "az_sensors"."Locations" "Locations" '
                            'ON "Locations"."locationId" = "Sensors"."locationId"')

    for sensor_data in result:
        sensor_id = str(sensor_data[0])
        location_point = str(sensor_data[1])
        measurements_data = parse_airly_measurements(sensor_id)

        if not measurements_data:
            query_db(query=f'UPDATE az_sensors."Sensors" SET "isActive" = false WHERE "sensorId" = {sensor_id}')
            continue
        else:
            query_db(query=f'UPDATE az_sensors."Sensors" SET "isActive" = true WHERE "sensorId" = {sensor_id}')

        values = measurements_data[sensor_id]
        timestamp = parse_str_to_timestamp(measurements_data['tillDateTime'])
        air_quality_index = measurements_data['AQI']

        for (factor_name, value) in values:
            query_base = 'INSERT INTO az_measurements."Measurements" ' \
                         '("sensorId", "locationPoint", "timestamp", "factorName", "value", "CAQI") '

            query_parameters = f'VALUES ({sensor_id}, \'{location_point}\',\'{timestamp}\', ' \
                               f'\'{factor_name}\', \'{value}\', \'{air_quality_index}\')'

            print(f"Imported {query_parameters}")
            query_db(query=query_base + query_parameters)


if __name__ == "__main__":
    main()
