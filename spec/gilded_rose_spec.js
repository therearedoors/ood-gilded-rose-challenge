const {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("a normal item decreases in quality", function() {
    const gildedRose = new Shop([ new Item("random", 1, 40) ]); 
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(39)
  expect(items[0].sellIn).toEqual(0)
  })

  it("an in-date normal item decreases in quality", function() {
    const gildedRose = new Shop([ new Item("random", 5, 40) ]);
    for (let i = 0; i < 4; i++) {
      gildedRose.updateQuality()
      
    }
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(35)
  expect(items[0].sellIn).toEqual(0)
  })

  it("an expired normal item decreases in quality two times as fast", function() {
    const gildedRose = new Shop([ new Item("random", 1, 40) ]); 
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toEqual(35)
  expect(gildedRose.items[0].sellIn).toEqual(-2)
  })

  it("sulfuras can't decrease in quality", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 1, 80) ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(80)
  })

  it("aged Brie increases in quality", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 20) ]); 
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toEqual(21)
  })

  it("expired aged Brie increases in quality twice as fast", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 20) ])
    gildedRose.updateQuality()
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(23)
  })

  it("backstage passes increase in value before the concert", function() {
    const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 11, 5) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(6)
  })

  it("backstage passes increase further value 10 days before the concert", function() {
    const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(7)
  })

  it("backstage passes increase even further value 5 days before the concert", function() {
    const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 5) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(8)
  })

  it("backstage passes are worthless after the concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50) ])
  const items = gildedRose.updateQuality()
  expect(items[0].quality).toEqual(0)
  })

  it("deals with a large input", () => {
    const inventory = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Conjured Mana Cake", 3, 6)
    ]
    const expected = [
    new Item("+5 Dexterity Vest", -20, 0),
    new Item("Aged Brie", -28, 50),
    new Item("Elixir of the Mongoose", -25, 0),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", -15, 0),
    new Item("Backstage passes to a TAFKAL80ETC concert", -20, 0),
    new Item("Backstage passes to a TAFKAL80ETC concert", -25, 0),
    new Item("Conjured Mana Cake", -27, 0)
    ]
    const gildedRose = new Shop(inventory)
    for (let i = 0; i < 29; i++) {
      gildedRose.updateQuality()
    }
    expect(gildedRose.updateQuality()).toEqual(expected)
  })

});
