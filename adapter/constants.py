class Querys:
    HISTORICAL_PRICES = """
                {{
                    prices(
                        first:1000
                        orderBy: timestamp 
                        oderDirection: desc
                        where:{{
                            assetPair: "{asset_pair}"
                            timestamp_lte: {to_timestamp}
                            timestamp_gt: {from_timestamp}
                            }}
                        ) {{
                        id
                        assetPair {{
                            id
                        }}
                        price
                        timestamp
                    }}
                }}
                """


class Endpoints:
    ENPOINT_NETWORK = {
        "Ethereum": 'https://api.thegraph.com/subgraphs/name/openpredict/chainlink-prices-subgraph'
    }


class ErrorMessages:
    NO_DATA_ERROR = 'No data provided'
    TIMESTAMP_ERROR = 'from_timestamp is more recent than to_timestamp',
    MISSING_PARAMETER = 'Request is missing some parameter'


class Parameters:
    STANDARD_PARAMS = ['from_timestamp','to_timestamp','asset_pair','network','indicator','time_frame','period']