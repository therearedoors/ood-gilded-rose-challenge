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
      item.processSellIn(item)
      item.updateSellInValue(item)
      item.processExpired(item)
    }
    return this.items;
  }

  static passedSellInDay(item,n){
    return item.sellIn < n
  }

  static decrementQuality(item){
    if (item.quality > 0) item.quality = item.quality - 1
  }

  static incrementQuality(item){
    if (item.quality < 50) item.quality = item.quality + 1;
  }
}

class Common extends Item {
    constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    }

    processSellIn(item){

    }

    updateSellInValue() {
      this.sellIn = this.sellIn - 1;
    }

    processExpired(item){

    }
  
}

class Legendary extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(){
    return this
  }
  
  updateSellInValue() {
    return this
  }
  
  processExpired(){
    return this
  }
  
}

class Depreciating extends Common {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(item){
    Shop.decrementQuality(this)
    }
  
    processExpired(){
      if (Shop.passedSellInDay(this, 0)) Shop.decrementQuality(this)
    }
}

class Conjured extends Depreciating {
    constructor(name, sellIn, quality) {
     super(name, sellIn, quality)
    }
  
    processSellIn(){
      for (let i=0; i<2; i++) Shop.decrementQuality(this)
    }
  
    processExpired(item){
      if (Shop.passedSellInDay(item, 0)) {
        this.updateExpiredItems(item)
      }
    }
  
    updateExpiredItems() {
      if (Shop.passedSellInDay(this,0)){
      for (let i=0; i<2; i++) Shop.decrementQuality(this)
      }
    }
    
}

class Appreciating extends Common {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(){
    this.processQualityIncrement()
  }

}

class Timelimited extends Appreciating {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processQualityIncrement(){
    Shop.incrementQuality(this)
    if (Shop.passedSellInDay(this, 11)) {
      Shop.incrementQuality(this)
    }
    if (Shop.passedSellInDay(this, 6)) {
      Shop.incrementQuality(this)
      }
  }

  processExpired(item){
    if (Shop.passedSellInDay(item, 0)) {
      item.quality = item.quality - item.quality;
    }
  }
}

class Vintage extends Appreciating {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }
  
    processQualityIncrement(){
    Shop.incrementQuality(this)
    }
  
    processExpired(){
      if (Shop.passedSellInDay(this, 0)) {
        Shop.incrementQuality(this)
      }
    }
}
module.exports = {
  Shop,
  Conjured,
  Timelimited,
  Legendary,
  Vintage,
  Depreciating,
}