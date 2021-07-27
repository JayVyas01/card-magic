import os
from flask import render_template, Flask

app = Flask(__name__, static_folder='', template_folder='', static_url_path='')


file_list=[]

@app.route("/")
def index():
    return render_template("index.html")


file_list = os.listdir(r"C:\Users\dell\PycharmProjects\Persistance\img")
selected_cards = []
suits = {"clubs" : 1, "diamonds": 2, "hearts": 3, "spades" : 4}

@app.route("/getimages")
def get_images():
    json = {"image_files" : file_list}
    return json

@app.route("/delete/<id>", methods= ['DELETE'])
def delete_id(id):
    selected_cards.append(file_list[int(id)])
    file_list.pop(int(id))
    print(file_list)
    return {"image_files": file_list}

@app.route("/getselected")
def get_selected_cards():
    return {"selected_images": selected_cards}

map_sum = {"123":1, "132": 2, "213": 3, "231": 4, "312": 5, "321": 6}

def compare(cards, card_suit, i, j):
    if cards[i] < cards[j]:
        return i
    elif cards[j] < cards[i]:
        return j
    elif cards[i] == cards[j]:
        if suits[card_suit[i]] < suits[card_suit[j]]:
            return i
        else:
            return j



def find_order():
    cards = []
    card_suit = []
    print(selected_cards)
    for i in range(len(selected_cards)):
        card_suit.append((selected_cards[i].split("_")[2]).split(".")[0])
        cards.append(int(selected_cards[i].split("_")[0]))
    order = ''
    if compare(cards, card_suit, 1,2) == 1:
        if compare(cards, card_suit, 2, 3) == 2:
            order = "123"
        else:
            if compare(cards, card_suit, 1, 3) == 1:
                order = "132"
            else:
                order =  "312"
    else:
        if compare(cards, card_suit, 2, 3) == 3:
            order = "321"
        else:
            if compare(cards, card_suit, 1, 3) == 1:
                order = "213"
            else:
                order = "231"

    add_on = map_sum[order]
    value = (cards[0] + add_on)%13

    if value<10:
         value = str(0) + str(value)
    else:
        value = str(value)

    fifth_card = value + "_of_" + card_suit[0] + ".png"

    return fifth_card




@app.route("/reveal")
def reveal():
    return {"fifth_card" : find_order()}

if __name__ == "__main__":
    app.run()
    print(file_list)
    print(1)
    print(selected_cards)