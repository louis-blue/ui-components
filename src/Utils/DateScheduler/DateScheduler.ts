// class DateScheduler extends RBush<{ dateBegin: Date; dateEnd: Date }> {
//   toBBox(item: { dateBegin: Date; dateEnd: Date }): BBox {
//     // console.log("toBBox", {
//     //   minX: item.dateBegin.getTime(),
//     //   minY: item.dateEnd.getTime(),
//     //   maxX: item.dateBegin.getTime(),
//     //   maxY: item.dateEnd.getTime()
//     // });
//
//     return {
//       minX: item.dateBegin.getTime(),
//       minY: item.dateEnd.getTime(),
//       maxX: item.dateBegin.getTime(),
//       maxY: item.dateEnd.getTime()
//     };
//   }
//
//   compareMinX(
//     a: { dateBegin: Date; dateEnd: Date },
//     b: { dateBegin: Date; dateEnd: Date }
//   ) {
//     return a.dateBegin.getTime() - b.dateBegin.getTime();
//   }
//
//   compareMinY(
//     a: { dateBegin: Date; dateEnd: Date },
//     b: { dateBegin: Date; dateEnd: Date }
//   ) {
//     return a.dateEnd.getTime() - b.dateEnd.getTime();
//   }
//
//   searchById(id?: string) {
//     console.log(this);
//   }
// }
import IntervalTree from "@flatten-js/interval-tree";

class DateScheduler {
  private _tree = new IntervalTree();
  private _map = new Map();

  constructor(arr: Array<{ dateBegin: Date; dateEnd: Date; id: string }> = []) {
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

  public add(item: { dateBegin: Date; dateEnd: Date; id: string }) {
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

  public update(item: { dateBegin: Date; dateEnd: Date; id: string }) {
    this.remove(item.id);
    this.add(item);
  }

  public search(item: { dateBegin?: Date; dateEnd?: Date; id?: string }) {
    if (item?.id) {
      if (this._map.has(item.id)) {
        return this._map.get(item.id);
      }
    }
    if (item?.dateBegin && item?.dateEnd) {
      return this._tree.search(
        [item.dateBegin.getTime(), item.dateEnd.getTime()],
        (value, interval) => {
          if (this._map.has(value)) {
            let friends = this._tree.search(
              interval.output(),
              (value, interval) => {
                if (this._map.has(value)) {
                  return this._map.get(value);
                }
              }
            );
            return {
              event: this._map.get(value),
              friends: friends,
              maxFriendsCount: this._getMaxFriends(friends.map(item => item.id))
            };
          } else {
            return null;
          }
        }
      );
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
