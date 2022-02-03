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
      item.updateQualityDefault()
      item.updateSellIn()
      item.updateQualityForExpired()
    }
    return this.items
  }
}

class Common extends Item {
  updateQualityDefault () {
  }

  updateSellIn () {
    this.sellIn = this.sellIn - 1
  }

  pastSellInDay (n) {
    return this.sellIn < n
  }

  decrementQuality () {
    if (this.quality > 0) {
      this.quality -= 1
    }
  }

  incrementQuality () {
    if (this.quality < 50) this.quality += 1
  }
}

class Legendary extends Item {
  updateQualityDefault () {
  }

  updateSellIn () {
  }

  updateQualityForExpired () {
  }
}

class Depreciating extends Common {
  updateQualityDefault () {
    this.processQualityDecrement()
  }

  processQualityDecrement () {
    this.decrementQuality()
  }

  updateQualityForExpired () {
    if (this.pastSellInDay(0)) this.processQualityDecrement()
  }
}

class Conjured extends Depreciating {
  processQualityDecrement () {
    for (let i = 0; i < 2; i++) {
      if (this.quality > 0) this.quality -= 1
    }
  }
}

class Appreciating extends Common {
  updateQualityDefault () {
    this.processQualityIncrement()
  }
}

class Timelimited extends Appreciating {
  processQualityIncrement () {
    this.incrementQuality()
    if (this.pastSellInDay(11)) {
      this.incrementQuality()
    }
    if (this.pastSellInDay(6)) {
      this.incrementQuality()
    }
  }

  updateQualityForExpired () {
    if (this.pastSellInDay(0)) this.quality = this.quality - this.quality
  }
}

class Vintage extends Appreciating {
  processQualityIncrement () {
    this.incrementQuality()
  }

  updateQualityForExpired () {
    if (this.pastSellInDay(0)) this.incrementQuality()
  }
}

module.exports = {
  Shop,
  Conjured,
  Timelimited,
  Legendary,
  Vintage,
  Depreciating
}
