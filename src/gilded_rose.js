class Item {
  constructor (name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

class Shop {
  constructor (items = []) {
    this.items = items
  }

  updateQuality () {
    for (const item of this.items) {
      item.updateSellInValue()
      item.updateQualityInDefaultCase()
      item.updateQualityIfExpired()
    }
    return this.items
  }
}

class Common extends Item {
  updateSellInValue () {
    this.sellIn = this.sellIn - 1
  }

  processQualityDecrement () {
    this.decrementQuality()
  }

  updateQualityInDefaultCase () {
    this.processQualityDecrement()
  }

  updateQualityIfExpired () {
    if (this.isPastSellInValue(0)) this.processQualityDecrement()
  }

  isPastSellInValue (n) {
    return this.sellIn < n
  }

  decrementQuality () {
    if (this.quality > 0) this.quality -= 1
  }

  incrementQuality () {
    if (this.quality < 50) this.quality += 1
  }
}

class Legendary extends Item {
  updateQualityInDefaultCase() {}

  updateSellInValue() {}

  updateQualityIfExpired() {}
}

class Conjured extends Common {
  processQualityDecrement () {
    for (let i = 0; i < 2; i++) {
      if (this.quality > 0) this.quality -= 1
    }
  }
}

class Timelimited extends Common {
// 10 DAY AND 5 DAY SPECIFIICTY HARD CODED HERE - UNSURE WHAT A BETTER REFACTORING WOULD
// LOOK LIKE, BESIDES PASSING EXTRA VALUES TO CONSTRUCTOR/ CREATING AN EDITABLE CONSTANT
  updateQualityInDefaultCase () {
    this.incrementQuality()
    if (this.isPastSellInValue(10)) {
      this.incrementQuality()
    }
    if (this.isPastSellInValue(5)) {
      this.incrementQuality()
    }
  }
// ALTERNATIVE HERE WOULD BE TO SIMPLY SET VALUE TO ZERO
  updateQualityIfExpired () {
    if (this.isPastSellInValue(1)) this.quality = this.quality - this.quality
  }
}

class Vintage extends Common {
  updateQualityInDefaultCase () {
    this.incrementQuality()
  }

  updateQualityIfExpired () {
    if (this.isPastSellInValue(0)) this.incrementQuality()
  }
}

module.exports = {
  Shop,
  Common,
  Conjured,
  Timelimited,
  Legendary,
  Vintage
}
