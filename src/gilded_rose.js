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
      this.updateSellInItems(i)
      this.updateSellIn(i)
      this.updateExpiredItems(i)
    }
    return this.items;
  }
  updateSellInItems(i){
    // IF ITEM IS NOT AN INCREASER
    if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') { //AND IF ITEM STILL HAS QUALITY
      if (this.items[i].quality > 0) {
        //AND IF ITEM ISN'T SULFURAS
        if (!this.legendaryItem(i)) {
          //DECREASE QUALITY BY ONE
          this.items[i].quality = this.items[i].quality - 1;
        }
      }
      //IF IT DOESN'T HAVE QUALITY
    } else {
    this.incrementQuality(i)
    }
  }

  incrementQuality(i){
    //IF QUALITY IS UNDER FIFTY
    if (this.items[i].quality < 50) {
      //INCREASE QUALITY BY ONE
      this.items[i].quality = this.items[i].quality + 1;
      //INCREASE AGAIN FOR ETC CONCERT PASS
      this.incrementBackstagePasses(i)
    }
  }

  incrementBackstagePasses(i){
    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
      //CHECK ETC PASS SELL IN VALUE
      if (this.items[i].sellIn < 11) {
        //CHECK QUALITY AGAIN
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
      //CHECK QUALITY AND SELL VALUE AGAIN
      if (this.items[i].sellIn < 6) {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
    }
  }

  updateSellIn(index) {
    if (!this.legendaryItem(index)) {
      this.items[index].sellIn = this.items[index].sellIn - 1;
    }
  }
  updateExpiredItems(i){
    //IF ITEM IS EXPIRED
    if (this.items[i].sellIn < 0) {
      //IF ITEM ISN'T AGED BRIE
      if (this.items[i].name != 'Aged Brie') {
        //OR A BACKSTAGE PASS
        if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          //AND IF THE ITEM STILL HAS QUALITY 
          if (this.items[i].quality > 0) {
            //AND ISN'T SULFURAS
            if (!this.legendaryItem(i)) {
              //DECREMENT ITEM AGAIN
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
          //YEET BACKSTAGE PASSES QUALITY
        } else {
          this.items[i].quality = this.items[i].quality - this.items[i].quality;
        }
        //INCREMENT AGED BRIE AGAIN
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
    }
  }

  legendaryItem(i){
    return this.items[i].name === 'Sulfuras, Hand of Ragnaros'
  }
}
module.exports = {
  Item,
  Shop
}
