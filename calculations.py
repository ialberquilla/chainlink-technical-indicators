import pandas as pd
from datetime import datetime

from indicators import Indicators


class Calculations:
    def __init__(self, time_frame, indicator, period, data) -> None:
        self.time_frame = time_frame
        self.indicator = indicator
        self.data = data
        self.period = period
        self.data_ohlc = None
        self.last_price = 0
        self.indicator_value = 0

        self.format_data_time_frame()

    def format_data_time_frame(self):
        df = pd.DataFrame(self.data)
        df = df.astype({"timestamp": int, "price": float})
        df['price'] = df['price'] / 1e8
        df['date'] = df['timestamp'].apply(
            lambda d: datetime.fromtimestamp(d)
        )
        df.set_index('date', inplace=True)
        self.data_ohlc = df['price'].resample(
            self.time_frame).ohlc(_method='ohlc').bfill()

        self.last_price = self.data_ohlc.iloc[-1]['close']
        indicator = Indicators(
            indicator=self.indicator,
            data=self.data_ohlc,
            period=self.period
        )
        self.indicator_value = indicator.indicator_value