import os
from flask import Flask, render_template, request
from parseFile import add1AndConvert


add1AndConvert()

parentFolder = os.path.abspath(os.path.join(os.getcwd(), os.pardir))
templates_folder = os.path.join(parentFolder, 'templates')
statics_folder = os.path.join(parentFolder, 'statics')

app = Flask(
    __name__,
    template_folder=templates_folder,
    static_folder=statics_folder
)


@app.route("/")
def hello():
    return render_template("main.html")


@app.route('/results', methods=['POST'])
def res():
    return str(float(request.form['x']) + float(request.form['y']))


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
