import pandas as pd


def add1AndConvert():
    path = "..\\statics\\data\\import.xlsx"

    df = pd.read_excel(path, skiprows=[])
    df = df + 1

    df.to_csv("..\\statics\\data\\export.csv", index=False)
