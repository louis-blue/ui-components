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

  public update(item: { dateBegin: Date; dateEnd: Date; id: string }) {}
}

export default DateScheduler;
