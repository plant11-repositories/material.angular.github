import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable } from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public id: string,
    public level = 1,
    public type = 'file',
    public expandable = false,
    public isLoading = false,
  ) {}
}

@Injectable({providedIn: 'root'})
export class DynamicDatabase {

  topNodes = [
    {name: 'root',type: 'folder'},
];

  initialData(): DynamicFlatNode[] {
    return this.topNodes.map(tn => {
      if(tn.type=='file'){
        return new DynamicFlatNode(tn.name,'', 0, tn.type, false);
      }else{
        return new DynamicFlatNode(tn.name,'', 0, tn.type, true);
      }
    }
    );
  }

}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase,
    private http: HttpClient,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const index = this.data.indexOf(node);

    if (expand) {

      node.isLoading = true;

      setTimeout(() => {

        let childNodes = [
          {name: 'under01',type: 'folder'},
          {name: 'under02',type: 'folder'},
          {name: 'under_file01',type: 'file'},
          {name: 'under_file02',type: 'file'},
        ];

        const nodes = childNodes.map(
          cn => {
            if(cn.type=='file'){
              return new DynamicFlatNode(cn.name,"0", node.level + 1, cn.type, false);
            }else{
              return new DynamicFlatNode(cn.name,"0", node.level + 1, cn.type, true);
            }
          }
        );

        this.data.splice(index + 1, 0, ...nodes);

        // notify the change
        this.dataChange.next(this.data);
        node.isLoading = false;
      }, 1000);

    }else{

      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {}
      this.data.splice(index + 1, count);

      this.dataChange.next(this.data);

    }

  }
}

@Component({
  selector: 'app-tree-sample',
  templateUrl: './tree-sample.component.html',
  styleUrls: ['./tree-sample.component.css']
})
export class TreeSampleComponent{

  constructor(
    database: DynamicDatabase,
    private http: HttpClient,
  ) {
  this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
  this.dataSource = new DynamicDataSource(this.treeControl, database,http);

  this.dataSource.data = database.initialData();

  }

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

}
