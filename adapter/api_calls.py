import requests
import json


def get_all_data_range(url, query, asset_pair, from_timestamp, to_timestamp):
    are_data = True
    json_records = []

    last_timestamp = from_timestamp

    while are_data:

        query_formatted = query.format(
            asset_pair=asset_pair,
            from_timestamp=last_timestamp,
            to_timestamp=to_timestamp
        )

        print(query_formatted)

        response = requests.post(url, json={'query': query_formatted})
        json_data = json.loads(response.text)
        response_lenght = len(json_data['data']['prices'])
        if (response_lenght > 0 ):
            list_data = json_data['data']['prices']
            last_timestamp = json_data['data']['prices'][response_lenght - 1]['timestamp']

            json_records = [*json_records, *list_data]
        else:
            are_data = False

    return json_records