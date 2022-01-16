import { ItemType } from '../enums';
import { Entity } from '../../entity/classes';

export class Item extends Entity {
  parentId: number;
  type: ItemType;
  position: number;
  isDone: boolean;
  title?: string;
}

export class TextItem extends Item {
  subTitle?: string;
  detail?: string;
}

export class UrlItem extends Item {
  url?: string;
}

export class ParentItem extends Item {
  items?: ChildItem[];
}

export class ChildItem extends Item {}
