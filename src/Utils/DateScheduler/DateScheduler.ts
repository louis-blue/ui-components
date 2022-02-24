import IntervalTree, {
  Interval,
  SearchOutput
} from "@flatten-js/interval-tree";
import {
  DateSchedulerClass,
  DateSchedulerEvent,
  DateSchedulerEventSearch,
  DateSchedulerEventSearchResultItem
} from "./types";

class DateScheduler implements DateSchedulerClass {
  private _tree = new IntervalTree();
  private _map = new Map();

  constructor(arr: Array<DateSchedulerEvent> = []) {
    for (let item of arr) {
      this._tree.insert(
        [item.dateBegin.getTime(), item.dateEnd.getTime()],
        item.id
      );
      this._map.set(item.id, item);
    }
  }

  public get keys() {
    return this._tree.keys;
  }

  public get values() {
    return this._tree.values;
  }

  public add(item: DateSchedulerEvent) {
    if (
      !this._map.has(item.id) &&
      this._tree.exist(
        [item.dateBegin.getTime(), item.dateEnd.getTime()],
        item.id
      )
    ) {
      this._tree.insert(
        [item.dateBegin.getTime(), item.dateEnd.getTime()],
        item.id
      );
      this._map.set(item.id, item);
    }
  }

  public remove(id: string) {
    if (this._map.has(id)) {
      let _item = this._map.get(id);
      if (
        this._tree.exist(
          [_item.dateBegin.getTime(), _item.dateEnd.getTime()],
          _item.id
        )
      ) {
        this._tree.remove(
          [_item.dateBegin.getTime(), _item.dateEnd.getTime()],
          _item.id
        );
      }
      this._map.delete(id);
    }
  }

  public update(item: DateSchedulerEvent) {
    this.remove(item.id);
    this.add(item);
  }

  public search(item: DateSchedulerEventSearch) {
    if (item?.id) {
      if (this._map.has(item.id)) {
        return this._map.get(item.id);
      }
    }
    if (item?.dateBegin && item?.dateEnd) {
      let _search: Array<DateSchedulerEventSearchResultItem> =
        this._tree.search(
          [item.dateBegin.getTime(), item.dateEnd.getTime()],
          (
            value: string,
            interval: Interval
          ): DateSchedulerEventSearchResultItem | undefined => {
            if (this._map.has(value)) {
              let friends: SearchOutput<DateSchedulerEvent> = this._tree.search(
                interval.output(),
                (value: string): DateSchedulerEvent | undefined => {
                  if (this._map.has(value)) {
                    return this._map.get(value);
                  }
                }
              ) as Array<DateSchedulerEvent>;

              return {
                event: this._map.get(value),
                friends: friends,
                maxFriendsCount: this._getMaxFriends(
                  friends.map(item => item.id)
                )
              };
            }
          }
        ) as Array<DateSchedulerEventSearchResultItem>;
      if (_search?.length > 0) {
        let _maxTimeColumn = Math.max(
          0,
          ..._search.map(item => item.maxFriendsCount)
        );
        return _search.map(item => {
          return {
            ...item,
            maxTimeColumn: _maxTimeColumn
          };
        });
      } else {
        return [] as Array<DateSchedulerEventSearchResultItem>;
      }
    }
  }

  private _getMaxFriends(
    friends: Array<string>,
    maxFriends: number = 0,
    visited: Set<string> = new Set()
  ): number {
    let _visited = new Set(visited);
    let _maxFriends = maxFriends;
    for (let i = 0; i < friends.length; i++) {
      let _targetFriends = this._map.get(friends[i]);
      if (_visited.has(_targetFriends.id)) {
        continue;
      }
      let _friends = this._tree.search([
        _targetFriends.dateBegin.getTime(),
        _targetFriends.dateEnd.getTime()
      ]);
      if (!Boolean(_friends?.length > 0)) {
        continue;
      }
      _visited.add(_targetFriends.id);
      _maxFriends = Math.max(...[friends.length, maxFriends]);
      let _newMaxFriends = this._getMaxFriends(
        _friends as Array<string>,
        _maxFriends,
        _visited
      );
      _maxFriends = Math.max(_newMaxFriends, _maxFriends);
    }
    return _maxFriends;
  }
}

export default DateScheduler;
