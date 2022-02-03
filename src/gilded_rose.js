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
    for (const item of this.items){
      this.processSellInItems(item)
      this.updateSellInValue(item)
      this.processExpiredItems(item)
    }
    return this.items;
  }

  processSellInItems(item){
    if (!this.appreciatingItem(item)) this.decrementQuality(item)
    else this.processQualityIncrement(item)
  }

  decrementQuality(item) {
    if (item.quality > 0) {
      if (!this.legendaryItem(item)) {
        item.quality = item.quality - 1;
      }
    }
  }

  processQualityIncrement(item){
    if (item.quality < 50) {
      item.quality = item.quality + 1
      if (this.timeLimitedItem(item)) {
        this.incrementTimeLimitedItem(item)
      }
    }
  }

  incrementQuality(item){
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  incrementTimeLimitedItem(item){
    if (this.passedSellInDay(item, 11)) {
      this.incrementQuality(item)
    }
    if (this.passedSellInDay(item, 6)) {
      this.incrementQuality(item)
      }
  }

  updateSellInValue(item) {
    if (!this.legendaryItem(item)) {
      item.sellIn = item.sellIn - 1;
    }
  }

  processExpiredItems(item){
    if (this.passedSellInDay(item, 0)) {
      this.updateExpiredItems(item)
    }
  }

  passedSellInDay(item, n) {
    return item.sellIn < n
  }

  updateExpiredItems(item) {
    if (!this.vintageItem(item)) {
      //OR A BACKSTAGE PASS
      if (!this.timeLimitedItem(item)) {
        //AND IF THE ITEM STILL HAS QUALITY 
        if (item.quality > 0) {
          //AND ISN'T SULFURAS
          if (!this.legendaryItem(item)) {
            //DECREMENT ITEM AGAIN
            item.quality = item.quality - 1;
          }
        }
        //YEET BACKSTAGE PASSES QUALITY
      } else {
        item.quality = item.quality - item.quality;
      }
      //INCREMENT AGED BRIE AGAIN
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  appreciatingItem(item){
    return this.timeLimitedItem(item) || this.vintageItem(item)
  }

  timeLimitedItem(item){
    return item.name === 'Backstage passes to a TAFKAL80ETC concert'
  }

  vintageItem(item){
    return item.name === 'Aged Brie'
  }

  legendaryItem(item){
    return item.name === 'Sulfuras, Hand of Ragnaros'
  }
}
module.exports = {
  Item,
  Shop
}