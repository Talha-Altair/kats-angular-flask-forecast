import pandas as pd
from kats.consts import TimeSeriesData
from kats.models.prophet import ProphetModel, ProphetParams


def forecast(file_name, time_col_name, steps):

    df = pd.read_csv(file_name, header=0, index_col=0)

    ts = TimeSeriesData(df=df, time_col_name=time_col_name)

    params = ProphetParams(seasonality_mode="multiplicative")

    m = ProphetModel(ts, params=params)

    m.fit()

    fcst = m.predict(steps=steps, freq="D")

    fcst = fcst.drop(columns=["fcst_lower", "fcst_upper"])
    fcst = fcst.rename(columns={"fcst": "prediction"})
    fcst = fcst.rename(columns={"time": time_col_name})

    data = fcst.to_dict(orient="records")

    for elem in data:

        try:

            elem[time_col_name] = str(elem[time_col_name])

        except:

            pass

    return data


if __name__ == "__main__":

    file_name = "./uploads/apple_data.csv"

    print(forecast(file_name, "date", 10))
