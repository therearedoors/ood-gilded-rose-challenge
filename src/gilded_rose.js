class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class Common extends Item {
    constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    }
  
    processSellIn(item){
      if (!this.appreciatingItem(item)) this.decrementQuality(item)
      else this.processQualityIncrement(item)
    }
  
    decrementQuality(item) {
      if (item.quality > 0) {
        if (!this.legendaryItem(item)) {
          item.quality = item.quality - 1;
        }
      }
      if (item instanceof Conjured) {
        item.decrementQuality()
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
  
    processExpired(item){
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
            if (item instanceof Conjured) item.decrementQuality()
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

class Appreciating extends Common {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(item){
    if (!this.appreciatingItem(item)) this.decrementQuality(item)
    else this.processQualityIncrement(item)
  }

  decrementQuality(item) {
    if (item.quality > 0) {
      if (!this.legendaryItem(item)) {
        item.quality = item.quality - 1;
      }
    }
    if (item instanceof Conjured) {
      item.decrementQuality()
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

  processExpired(item){
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
          if (item instanceof Conjured) item.decrementQuality()
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

class Legendary extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(item){
    if (!this.appreciatingItem(item)) this.decrementQuality(item)
    else this.processQualityIncrement(item)
  }

  decrementQuality(item) {
    if (item.quality > 0) {
      if (!this.legendaryItem(item)) {
        item.quality = item.quality - 1;
      }
    }
    if (item instanceof Conjured) {
      item.decrementQuality()
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

  processExpired(item){
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
          if (item instanceof Conjured) item.decrementQuality()
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

class Depreciating extends Common {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(item){
    if (!this.appreciatingItem(item)) this.decrementQuality(item)
    else this.processQualityIncrement(item)
  }

  decrementQuality(item) {
    if (item.quality > 0) {
      if (!this.legendaryItem(item)) {
        item.quality = item.quality - 1;
      }
    }
    if (item instanceof Conjured) {
      item.decrementQuality()
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

  processExpired(item){
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
          if (item instanceof Conjured) item.decrementQuality()
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

class Conjured extends Depreciating {
    constructor(name, sellIn, quality) {
     super(name, sellIn, quality)
    }
  
    processSellIn(item){
      if (!this.appreciatingItem(item)) this.decrementQuality(item)
      else this.processQualityIncrement(item)
    }
  
    decrementQuality(item) {
      if (item.quality > 0) {
        if (!this.legendaryItem(item)) {
          item.quality = item.quality - 1;
        }
      }
      if (item.quality > 0) {
          item.quality = item.quality - 1;
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
  
    processExpired(item){
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
              //DECREMENT ITEM AGAIN
              item.quality = item.quality - 1;
          //YEET BACKSTAGE PASSES QUALITY
        }
        if (item.quality > 0) {
          //AND ISN'T SULFURAS
            //DECREMENT ITEM AGAIN
            item.quality = item.quality - 1;
        //YEET BACKSTAGE PASSES QUALITY
        }
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

class Timelimited extends Appreciating {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(item){
    if (!this.appreciatingItem(item)) this.decrementQuality(item)
    else this.processQualityIncrement(item)
  }

  decrementQuality(item) {
    if (item.quality > 0) {
      if (!this.legendaryItem(item)) {
        item.quality = item.quality - 1;
      }
    }
    if (item instanceof Conjured) {
      item.decrementQuality()
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

  processExpired(item){
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
          if (item instanceof Conjured) item.decrementQuality()
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

class Vintage extends Appreciating {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

    processSellIn(item){
      if (!this.appreciatingItem(item)) this.decrementQuality(item)
      else this.processQualityIncrement(item)
    }
  
    decrementQuality(item) {
      if (item.quality > 0) {
        if (!this.legendaryItem(item)) {
          item.quality = item.quality - 1;
        }
      }
      if (item instanceof Conjured) {
        item.decrementQuality()
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
  
    processExpired(item){
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
            if (item instanceof Conjured) item.decrementQuality()
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



class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items){
      item.processSellIn(item)
      item.updateSellInValue(item)
      item.processExpired(item)
    }
    return this.items;
  }

}
module.exports = {
  Item,
  Shop,
  Conjured,
  Timelimited,
  Legendary,
  Vintage,
  Common
}