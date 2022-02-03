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
      item.processSellIn()
      item.updateSellInValue()
      item.processExpired()
    }
    return this.items;
  }
}

class Common extends Item {
    constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    }

    processSellIn(){

    }

    updateSellInValue() {
      this.sellIn = this.sellIn - 1;
    }

    processExpired(){

    }

    passedSellInDay(n){
      return this.sellIn < n
    }

    decrementQuality(){
      if (this.quality > 0) this.quality -= 1
    }
  
    incrementQuality(item){
      if (this.quality < 50) this.quality += 1
    }
  
}

class Legendary extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(){
  }
  
  updateSellInValue() {
  }
  
  processExpired(){
  }
  
}

class Depreciating extends Common {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  processSellIn(){
    this.decrementQuality()
    }
  
    processExpired(){
      if (this.passedSellInDay(0)) this.decrementQuality()
    }
}

class Conjured extends Depreciating {
    constructor(name, sellIn, quality) {
     super(name, sellIn, quality)
    }
  
    processSellIn(){
      for (let i=0; i<2; i++) this.decrementQuality()
    }
  
    processExpired(){
      if (this.passedSellInDay(0)){
        for (let i=0; i<2; i++) this.decrementQuality()
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
    this.incrementQuality()
    if (this.passedSellInDay(11)) {
      this.incrementQuality()
    }
    if (this.passedSellInDay(6)) {
      this.incrementQuality()
      }
  }

  processExpired(){
    if (this.passedSellInDay(0)) this.quality = this.quality - this.quality
  }
}

class Vintage extends Appreciating {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }
  
    processQualityIncrement(){
    this.incrementQuality()
    }
  
    processExpired(){
      if (this.passedSellInDay(0)) this.incrementQuality()
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