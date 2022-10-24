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