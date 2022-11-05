from constants import ErrorMessages, Parameters



def validate_request_data(adapter):
    if adapter.request_data is None:
        return False,ErrorMessages.NO_DATA_ERROR
    if adapter.request_data == {}:
        return False, ErrorMessages.NO_DATA_ERROR
    if adapter.request_data['from_timestamp'] >  adapter.request_data['to_timestamp']:
        return False, ErrorMessages.TIMESTAMP_ERROR
    for p in Parameters.STANDARD_PARAMS:
        if p not in adapter.request_data:
            return False, ErrorMessages.MISSING_PARAMETER
    return True, ''