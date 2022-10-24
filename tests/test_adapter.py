from constants import ErrorMessages
import pytest
import adapter

job_run_id = '1'
network = 'Ethereum'
asset_pair = "ETH/USD"
indicator = 'SMA'
time_frame = '15Min'
period = 100


def adapter_setup(test_data):
    a = adapter.Adapter(test_data)
    return a.result


@pytest.mark.parametrize('test_data', [
    {'id': job_run_id,
     'data': {
         "from_timestamp": '1654329246',
         "to_timestamp": '1659599646',
         "asset_pair": asset_pair,
         "network": network,
         "indicator": indicator,
         "time_frame": time_frame,
         "period": period
     }},
])
def test_create_request_success(test_data):
    result = adapter_setup(test_data)

    assert result['statusCode'] == 200
    assert result['jobRunID'] == job_run_id
    assert result['result'] is not None


@pytest.mark.parametrize('test_data', [
    {'id': job_run_id,
        'data': {
            "from_timestamp": '1659599646',
            "to_timestamp": '1654329246',
            "asset_pair": asset_pair,
            "network": network,
            "indicator": indicator,
            "time_frame": time_frame,
            "period": period
        }},
])
def test_create_request_error_timestamp(test_data):
    result = adapter_setup(test_data)
    assert result['statusCode'] == 500
    assert result['jobRunID'] == job_run_id
    assert result['status'] == 'errored'
    assert result['error'] is not None
    assert result['error'] == 'There was an error: ' + \
        ErrorMessages.TIMESTAMP_ERROR


@pytest.mark.parametrize('test_data', [
    {'id': job_run_id,
        'data': {}
     },
])
def test_create_request_error_no_data(test_data):
    result = adapter_setup(test_data)
    print(result)
    assert result['statusCode'] == 500
    assert result['jobRunID'] == job_run_id
    assert result['status'] == 'errored'
    assert result['error'] is not None
    assert result['error'] == 'There was an error: ' + \
        ErrorMessages.NO_DATA_ERROR


@pytest.mark.parametrize('test_data', [
    {'id': job_run_id,
        'data': {
            "from_timestamp": '1659599646',
            "to_timestamp": '1654329246',
            "asset_pair": asset_pair,
            "indicator": indicator,
            "time_frame": time_frame,
            "period": period
        }
     },
])
def test_create_request_error_missing_params(test_data):
    result = adapter_setup(test_data)
    print(result)
    assert result['statusCode'] == 500
    assert result['jobRunID'] == job_run_id
    assert result['status'] == 'errored'
    assert result['error'] is not None