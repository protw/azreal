import ciso8601


def parse_str_to_unixtime(date_str: str):
    import time
    return time.mktime(parse_str_to_timestamp(date_str).timetuple())


def parse_str_to_timestamp(date_str: str):
    return ciso8601.parse_datetime(date_str)
