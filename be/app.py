import requests

api_key = "8554c5268084fdcdf6b9d9ac68fb4389"


city = input("Enter City: ")

weather_data = requests.get(
    f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&APPID={api_key}")

if weather_data.json()['cod'] == '404':
    print('No City Found')
else:
    weather = weather_data.json()['weather'][0]['main']
    temp = round(weather_data.json()['main']['temp'])


print(f"the weater in {city} is: {weather}")
print(f"the temperature in {city} is: {temp}ºF")