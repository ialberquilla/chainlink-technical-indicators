import time
from api_calls import get_all_data_range
from bridge import Bridge
import json
from constants import (
    Querys,
    Endpoints,
)
import validator


class Adapter:
    def __init__(self, input):
        self.id = input.get('id', '1')
        self.request_data = input.get('data')
        self.bridge = Bridge()
        isParamsOk, errorMessage = self.validate_request_data()
        if isParamsOk:
            self.network = self.request_data['network']
            self.create_request(
                self.request_data['asset_pair'],
                self.request_data['from_timestamp'],
                self.request_data['to_timestamp']
            )
        else:
            self.result_error(errorMessage)

    def validate_request_data(self):
        return validator.validate_request_data(self)

    def create_request(self, asset_pair, from_timestamp, to_timestamp):
        try:
            url = Endpoints.ENPOINT_NETWORK[self.network]
            data = get_all_data_range(
                url=url,
                query=Querys.HISTORICAL_PRICES,
                asset_pair=asset_pair,
                from_timestamp=from_timestamp,
                to_timestamp=to_timestamp
            )

            self.result = data
            self.result_success()
        except Exception as e:
            self.result_error(e)
        finally:
            self.bridge.close()

    def result_success(self):
        self.result = {
            'jobRunID': self.id,
            'result': self.result,
            'statusCode': 200,
        }

    def result_error(self, error):
        self.result = {
            'jobRunID': self.id,
            'status': 'errored',
            'error': f'There was an error: {error}',
            'statusCode': 500,
        }