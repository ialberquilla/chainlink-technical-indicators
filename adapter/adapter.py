from api_calls import get_all_data_range
from bridge import Bridge
from calculations import Calculations
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
        params_ok, error_message = self.validate_request_data()
        if params_ok:
            self.network = self.request_data['network']
            self.asset_pair = self.request_data['asset_pair']
            self.from_timestamp = self.request_data['from_timestamp']
            self.to_timestamp = self.request_data['to_timestamp']
            self.indicator = self.request_data['indicator']
            self.time_frame = self.request_data['time_frame']
            self.period = self.request_data['period']
            self.create_request()
        else:
            self.result_error(error_message)

    def validate_request_data(self):
        return validator.validate_request_data(self)

    def create_request(self):
        try:
            url = Endpoints.ENPOINT_NETWORK[self.network]
            data = get_all_data_range(
                url=url,
                query=Querys.HISTORICAL_PRICES,
                asset_pair=self.asset_pair,
                from_timestamp=self.from_timestamp,
                to_timestamp=self.to_timestamp
            )

            calcs = Calculations(
                time_frame=self.time_frame,
                indicator=self.indicator,
                period=self.period,
                data=data
            )

            self.result = {
                'last_price': calcs.last_price,
                'indicator_value': calcs.indicator_value,
                'indicator': self.indicator
            }
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