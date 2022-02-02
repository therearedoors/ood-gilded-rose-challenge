class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.mysteryMethodOne(i)
      this.updateSellIn(i)
      this.mysteryMethodTwo(i)
    }
    return this.items;
  }

  mysteryMethodOne(i){
    if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (this.items[i].quality > 0) {
        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          this.items[i].quality = this.items[i].quality - 1;
        }
      }
    } else {
    this.subMysteryMethodOne(i)
    }
  }

  subMysteryMethodOne(i){
    if (this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality + 1;
      if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].sellIn < 11) {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
        if (this.items[i].sellIn < 6) {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
  }

  updateSellIn(index) {
    if (this.items[index].name != 'Sulfuras, Hand of Ragnaros') {
      this.items[index].sellIn = this.items[index].sellIn - 1;
    }
  }
  mysteryMethodTwo(i){
    if (this.items[i].sellIn < 0) {
      if (this.items[i].name != 'Aged Brie') {
        if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].quality > 0) {
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        } else {
          this.items[i].quality = this.items[i].quality - this.items[i].quality;
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
    }
  }
}
module.exports = {
  Item,
  Shop
}
