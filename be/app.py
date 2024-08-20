from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

api_key = "8554c5268084fdcdf6b9d9ac68fb4389"

@app.route('/get_weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is missing"}), 400

    weather_data = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&APPID={api_key}")

    if weather_data.json()['cod'] == '404':
        return jsonify({"error": "No City Found"}), 404
    else:
        weather = weather_data.json()['weather'][0]['main']
        temp = round(weather_data.json()['main']['temp'])
        return jsonify({"city": city, "weather": weather, "temperature": temp})

if __name__ == '__main__':
    app.run(debug=True)