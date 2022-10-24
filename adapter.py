import time
import requests
from bridge import Bridge

import json

class Adapter:
    base_url = 'https://min-api.cryptocompare.com/data/price'
    from_params = ['base', 'from', 'coin']
    to_params = ['quote', 'to', 'market']
    base_url = 'https://api.thegraph.com/subgraphs/name/openpredict/chainlink-prices-subgraph'
    params = ["timestamp", "assetpair"]

    # to_params = ['quote', 'to', 'market']

    def __init__(self, input):
        self.id = input.get('id', '1')
        self.request_data = input.get('data')
        self.bridge = Bridge()
        if self.validate_request_data():
            self.bridge = Bridge()
            self.set_params()

            # 1 june 22
            self.set_query(int(time.time()), self.request_data['timestamp']) 
            # self.set_query(int(time.time()))
            self.create_request()
        else:
            self.result_error('No data provided')

    def validate_request_data(self):

        if self.request_data is None:
            return False
        if self.request_data == {}:
            return False
        return True

    def set_params(self):
        for param in self.from_params:
            self.from_param = self.request_data.get(param)
            if self.from_param is not None:
                break
        for param in self.to_params:
            self.to_param = self.request_data.get(param)
            if self.to_param is not None:
                break
    def set_query(self, startingTimestamp, targetTimestamp):
        # from the most recent event
        print('self params', self.request_data)
        # get first 1000 results from the most recent to the target timestamp
        self.query  = """
                {
                    prices(
                        first:1000
                        orderBy: timestamp 
                        oderDirection: desc
                        where:{
                            assetPair_contains: \""""+str(self.request_data['assetpair'])+"""\"
                            timestamp_lte: """+str(startingTimestamp)+"""
                            timestamp_gte: """+str(targetTimestamp)+"""
                            }
                        ) {
                        id
                        assetPair {
                            id
                        }
                        price
                        timestamp
                    }
                }
                """
        print('self.query=',self.query)

    def create_request(self):
        try:
            params = {
                'fsym': self.from_param,
                'tsyms': self.to_param,
            }
            response = self.bridge.request(self.base_url, params)
            data = response.json()
            self.result = data[self.to_param]
            data['result'] = self.result
            self.result_success(data)

            response = requests.post(self.base_url, json={'query': self.query})
            data = json.loads(response.text)
            lastTimestampOfTheArray = int(data['data']['prices'][-1]['timestamp'])
            list = [data['data']['prices']]

            # if request timestamp is LESS RECENT than LAST ELEMENT IN ARRAY
            if lastTimestampOfTheArray > self.request_data['timestamp']  :
                # do other request
                self.set_query(lastTimestampOfTheArray, self.request_data['timestamp'])
                response = requests.post(self.base_url, json={'query': self.query})
                data = json.loads(response.text)
                lastTimestampOfTheArray = int(data['data']['prices'][-1]['timestamp'])
                # print(lastTimestampOfTheArray)
                # not sure how to concat the results
                # list = list.extend([data['data']['prices']])

            self.result = data
            # data['result'] = self.result
            self.result_success()
        except Exception as e:
            self.result_error(e)
        finally:
            self.bridge.close()

    def result_success(self, data):
    def result_success(self):
        self.result = {
            'jobRunID': self.id,
            'data': data,
            # 'data': data,
            'result': self.result,
            'statusCode': 200,
        }