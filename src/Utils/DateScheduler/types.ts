import { Interval, Node, NumericTuple } from "@flatten-js/interval-tree";

export type DateSchedulerEvent = { dateBegin: Date; dateEnd: Date; id: string };
export type DateSchedulerEventSearch = {
  dateBegin?: Date;
  dateEnd?: Date;
  id?: string;
};
export type DateSchedulerEventSearchResultItem = {
  event: DateSchedulerEvent;
  friends: Array<DateSchedulerEvent>;
  maxFriendsCount: number;
  maxTimeColumn?: number;
};

export declare interface DateSchedulerClass {
  get keys(): Array<Node<Interval | NumericTuple>>;

  get values(): Array<DateSchedulerEvent>;

  add(item: DateSchedulerEvent): void;

  remove(id: string): void;

  update(item: DateSchedulerEvent): void;

  search(
    item: DateSchedulerEventSearch
  ): Array<DateSchedulerEventSearchResultItem> | DateSchedulerEvent;
}
