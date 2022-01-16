import { Injectable } from '@nestjs/common';
import { ChildItem, ParentItem, TextItem, UrlItem } from './classes';
import { ItemType } from './enums';

export type ItemLike = TextItem | UrlItem | ParentItem | ChildItem;

@Injectable()
export class ItemService {
  private readonly _items: ItemLike[] = [];

  constructor() {
    const textItem = new TextItem();
    const urlItem = new UrlItem();
    const parentItem = new ParentItem();
    const childItem = new ChildItem();

    textItem.id = 1;
    textItem.position = 1;
    textItem.type = ItemType.TextItem;
    textItem.parentId = 1;
    textItem.title = 'Buy cheese';
    textItem.isDone = false;
    textItem.subTitle = 'Edam slices & mature cheddar';
    textItem.detail = "Slices from Morrison's and cheddar from, Cathedral City";

    urlItem.id = 2;
    urlItem.position = 2;
    urlItem.type = ItemType.UrlItem;
    urlItem.parentId = 1;
    urlItem.title = 'But this beer mug';
    urlItem.isDone = false;
    urlItem.url =
      'https://s3-us-west-2.amazonaws.com/craftbeerdotcom/wp-content/uploads/fall-beer-stein.jpg';

    parentItem.id = 3;
    parentItem.position = 3;
    parentItem.type = ItemType.ParentItem;
    parentItem.parentId = 1;
    parentItem.title = 'Buy Christmas presents';
    parentItem.isDone = false;
    parentItem.items = [];

    childItem.id = 1;
    childItem.position = 1;
    childItem.type = ItemType.ChildItem;
    childItem.parentId = parentItem.id;
    childItem.title = 'Mom';
    childItem.isDone = false;

    parentItem.items.push(childItem);

    this._items.push(textItem);
    this._items.push(urlItem);
    this._items.push(parentItem);
  }

  async add(item: ItemLike): Promise<ItemLike> {
    const newItem = item;
    item.id = this._items.length === 0 ? 1 : this._items.length + 1;

    this._items.push(item);

    return newItem;
  }

  // async find(userId: number): Promise<ItemLike[]> {
  //   const normalItems = this._items.filter(
  //     i => i.type !== ItemType.ChildItem && i.parentId === userId,
  //   );
  //   const parentItems = normalItems.filter(i => i.type === ItemType.ParentItem);
  //
  //   for (const parentItem of parentItems) {
  //     if (parentItem instanceof ParentItem) {
  //       parentItem.items = this._items.filter(
  //         i => i.type === ItemType.ChildItem && i.parentId === parentItem.parentId,
  //       );
  //     }
  //   }
  //
  //   return [...normalItems, ...parentItems];
  // }
  async find(type: ItemType): Promise<ItemLike[]> {
    // TODO items of the user only
    return this._items.filter(i => i.type === type);
  }

  async get(id: number): Promise<ItemLike> {
    return this._items.find(i => i.id === id && i.type !== ItemType.ChildItem);
  }

  async update(id: number, updatedItem: ItemLike): Promise<ItemLike> {
    const item = this._items.find(i => i.id === id);

    if (typeof item === 'undefined') {
      return;
    }

    const index = this._items.indexOf(item);
    this._items[index] = { ...item, ...updatedItem };

    return { ...item, ...updatedItem };
  }

  async remove(id: number): Promise<boolean> {
    const item = this._items.find(i => i.id === id);

    if (typeof item === 'undefined') {
      return false;
    }

    const index = this._items.indexOf(item);
    delete this._items[index];

    return true;
  }
}
