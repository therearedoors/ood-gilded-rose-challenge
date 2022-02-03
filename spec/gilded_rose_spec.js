const {Shop, Item, Common, Legendary, Timelimited, Vintage, Conjured} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("1) a normal item decreases in quality", function() {
    const gildedRose = new Shop([ new Common("random", 1, 40) ]); 
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(39)
  expect(items[0].sellIn).toEqual(0)
  })

  it("2) an in-date normal item decreases in quality", function() {
    const gildedRose = new Shop([ new Common("random", 5, 40) ]);
    for (let i = 0; i < 4; i++) {
      gildedRose.updateQuality()
    }
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(35)
  expect(items[0].sellIn).toEqual(0)
  })

  it("3) an expired normal item decreases in quality two times as fast", function() {
    const gildedRose = new Shop([ new Common("random", 1, 40) ]); 
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toEqual(35)
  expect(gildedRose.items[0].sellIn).toEqual(-2)
  })

  it("4) sulfuras can't decrease in quality", function() {
    const gildedRose = new Shop([ new Legendary("Sulfuras, Hand of Ragnaros", 1, 80) ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(80)
  })

  it("5) aged Brie increases in quality", function() {
    const gildedRose = new Shop([ new Vintage("Aged Brie", 1, 20) ]); 
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(21)
  })

  it("6) expired aged Brie increases in quality twice as fast", function() {
    const gildedRose = new Shop([ new Vintage("Aged Brie", 1, 20) ])
    gildedRose.updateQuality()
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(23)
  })

  it("7) backstage passes increase in value before the concert", function() {
    const gildedRose = new Shop([ new Timelimited('Backstage passes to a TAFKAL80ETC concert', 11, 5) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(6)
  })

  it("8) backstage passes increase further value 10 days before the concert", function() {
    const gildedRose = new Shop([ new Timelimited('Backstage passes to a TAFKAL80ETC concert', 10, 5) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(7)
  })

  it("9) backstage passes increase even further value 5 days before the concert", function() {
    const gildedRose = new Shop([ new Timelimited('Backstage passes to a TAFKAL80ETC concert', 5, 5) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(8)
  })

  it("10) backstage passes are worthless after the concert", function() {
    const gildedRose = new Shop([ new Timelimited("Backstage passes to a TAFKAL80ETC concert", 0, 50) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(0)
  })

  it("11) deals with a large input", () => {
    const inventory = [
      new Common("+5 Dexterity Vest", 10, 20),
      new Vintage("Aged Brie", 2, 0),
      new Common("Elixir of the Mongoose", 5, 7),
      new Legendary("Sulfuras, Hand of Ragnaros", 0, 80),
      new Legendary("Sulfuras, Hand of Ragnaros", -1, 80),
      new Timelimited("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Timelimited("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Timelimited("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Common("Conjured Mana Cake", 3, 6)
    ]
    const expected = [
    new Common("+5 Dexterity Vest", 7, 17),
    new Vintage("Aged Brie", -1, 4),
    new Common("Elixir of the Mongoose", 2, 4),
    new Legendary("Sulfuras, Hand of Ragnaros", 0, 80),
    new Legendary("Sulfuras, Hand of Ragnaros", -1, 80),
    new Timelimited("Backstage passes to a TAFKAL80ETC concert", 12, 23),
    new Timelimited("Backstage passes to a TAFKAL80ETC concert", 7, 50),
    new Timelimited("Backstage passes to a TAFKAL80ETC concert", 2, 50),
    new Common("Conjured Mana Cake", 0, 3)
    ]
    const gildedRose = new Shop(inventory)
    for (let i = 0; i < 2; i++) {
      gildedRose.updateQuality()
    }
    expect(gildedRose.updateQuality()).toEqual(expected)
  })

  it("12) deals with a large input over a long time", () => {
    const inventory = [
      new Common("+5 Dexterity Vest", 10, 20),
      new Vintage("Aged Brie", 2, 0),
      new Common("Elixir of the Mongoose", 5, 7),
      new Legendary("Sulfuras, Hand of Ragnaros", 0, 80),
      new Legendary("Sulfuras, Hand of Ragnaros", -1, 80),
      new Timelimited("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Timelimited("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Timelimited("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Common("Conjured Mana Cake", 3, 6)
    ]
    const expected = [
    new Common("+5 Dexterity Vest", -20, 0),
    new Vintage("Aged Brie", -28, 50),
    new Common("Elixir of the Mongoose", -25, 0),
    new Legendary("Sulfuras, Hand of Ragnaros", 0, 80),
    new Legendary("Sulfuras, Hand of Ragnaros", -1, 80),
    new Timelimited("Backstage passes to a TAFKAL80ETC concert", -15, 0),
    new Timelimited("Backstage passes to a TAFKAL80ETC concert", -20, 0),
    new Timelimited("Backstage passes to a TAFKAL80ETC concert", -25, 0),
    new Common("Conjured Mana Cake", -27, 0)
    ]
    const gildedRose = new Shop(inventory)
    for (let i = 0; i < 29; i++) {
      gildedRose.updateQuality()
    }
    expect(gildedRose.updateQuality()).toEqual(expected)
  })

  it("13) an in date conjured item depreciates twice as fast", function() {
    const gildedRose = new Shop([ new Conjured("Conjured Mana Cake", 1, 3) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(1)
  })

  it("14) an out of date conjured item depreciates twice as fast as non-conjured", function() {
    const gildedRose = new Shop([ new Conjured("Conjured Mana Cake", 0, 5) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(1)
  })

  it("15) conjured item quality depreciates at expected rate, but stops at 0", function() {
    const gildedRose = new Shop([ new Conjured("Conjured Mana Cake", 2, 15) ])
    const conjured = gildedRose.items[0]
    for (let i=0;i<2;i++) gildedRose.updateQuality()
    expect(conjured.quality).toEqual(11)
    for(let i=0;i<2;i++) gildedRose.updateQuality()
    expect(conjured.quality).toEqual(3)
    gildedRose.updateQuality()
    expect(conjured.quality).toEqual(0)
  })

});
