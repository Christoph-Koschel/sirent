from datetime import datetime


def get_time():
    return datetime.now().strftime("%d.%m.%Y %H:%M:%S")


def get_ping(client):
    ping_ = client.latency
    ping = round(ping_ * 1000)
    return ping
