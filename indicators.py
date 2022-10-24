import pandas as pd
from datetime import datetime


class Indicators:
    def __init__(self, indicator, period, data) -> None:
        self.indicator = indicator
        self.data = data
        self.period = period
        self.indicators = {
            'SMA': self.calculate_sma
        }
        self.calculate_indicator()

    def calculate_indicator(self):
        return self.indicators[self.indicator]()

    def calculate_sma(self):
        self.data['SMA'] = self.data.close.rolling(int(self.period)).mean()
        self.indicator_value = self.data.iloc[-1]['SMA']