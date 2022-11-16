import pandas as pd
import pandas_ta as ta
from datetime import datetime


class Indicators:
    def __init__(self, indicator, period, data) -> None:
        self.indicator = indicator
        self.data = data
        self.period = period
        self.indicators = {
            'SMA': self.calculate_sma,
            'EMA': self.calculate_ema,
            'BB': self.calculate_bb, 
            'RSI': self.calculate_rsi,
            'ATR': self.calculate_atr,
        }
        self.calculate_indicator()
    

    def calculate_indicator(self):
        return self.indicators[self.indicator]()

    def calculate_sma(self):
        self.data['SMA'] = self.data.ta.sma(close=self.data.close, length=int(self.period))
        self.indicator_value = int(self.data['SMA'].iloc[-1])

    def calculate_ema(self):
        self.data['EMA'] = self.data.ta.ema( close=self.data.close, length=int(self.period))
        self.indicator_value = int(self.data['EMA'].iloc[-1])
        
    def calculate_bb(self):
        bbands = self.data.ta.bbands(close=self.data.close,length=int(self.period))
        self.indicator_value = {}
        for k,v in bbands.items():
            self.indicator_value[k] = int(v.iloc[-1])

    def calculate_rsi(self): 
        rsi = self.data.ta.rsi(close=self.data.close, length=int(self.period))
        self.indicator_value = int(rsi.iloc[-1])

    def calculate_atr(self): 
        atr = self.data.ta.atr(high=self.data.high, low=self.data.low, close=self.data.close, length=int(self.period))
        self.indicator_value = int(atr.iloc[-1])