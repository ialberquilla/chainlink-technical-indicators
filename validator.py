from constants import ErrorMessages


def validate_request_data(adapter):
    if adapter.request_data is None:
        return False,ErrorMessages.NO_DATA_ERROR
    if adapter.request_data == {}:
        return False, ErrorMessages.NO_DATA_ERROR
    if adapter.request_data['from_timestamp'] >  adapter.request_data['to_timestamp']:
        return False, ErrorMessages.TIMESTAMP_ERROR
    return True, ''