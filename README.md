# Angular Material 動的Tree 導入

## 動的Tree導入後イメージ
![image](https://user-images.githubusercontent.com/38905609/174697935-d959c611-6b90-4d0a-a5f9-772e397744e0.png)

![image](https://user-images.githubusercontent.com/38905609/174697956-6ea53fb5-dc57-4c65-9728-14a24c63287b.png)

![image](https://user-images.githubusercontent.com/38905609/174697975-2934fa47-8d9f-4288-8889-61c8e8f50232.png)


## Angular Material 導入
👇以下参照下さい。  
https://github.com/jun-knd/material.angular.github/tree/material

## コンポーネント追加

```
ng generate component tree-sample
```

## コンポーネント組み込み

`app.module.ts`
```ts:app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material.module';
import { TreeSampleComponent } from './tree-sample/tree-sample.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

`app.component.html`
```html:app.component.html
<app-tree-sample></app-tree-sample>

```

## コンポーネント定義

`tree-sample.component.css`
```css:tree-sample.component.css
.example-tree-progress-bar {
  margin-left: 30px;
}
.type-icon {
  color: #757575;
  margin-right: 5px;
}

```

`tree-sample.component.ts`
```ts:tree-sample.component.ts
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

```

`tree-sample.component.html`
```html:tree-sample.component.html
<p>tree-sample works!</p>
<mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
    <button mat-icon-button disabled></button>
    <mat-icon class="type-icon" [attr.aria-label]="node.type + 'icon'">
      {{ node.type ==='file' ? 'description' : 'folder' }}
    </mat-icon>
    {{node.item}}
  </mat-tree-node>
  <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
    <button mat-icon-button
            [attr.aria-label]="'Toggle ' + node.item" matTreeNodeToggle>
      <mat-icon class="mat-icon-rtl-mirror">
        {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
      </mat-icon>
    </button>
    <mat-radio-button value="{{node.name}}" >
    <mat-icon class="type-icon" [attr.aria-label]="node.type + 'icon'">
      {{ node.type ==='file' ? 'description' : 'folder' }}
    </mat-icon>
    {{node.item}}
    </mat-radio-button>
    <mat-progress-bar *ngIf="node.isLoading"
                      mode="indeterminate"
                      class="example-tree-progress-bar"></mat-progress-bar>
  </mat-tree-node>
</mat-tree>

```

## 動作確認
```
ng s --o
```

## Stackblitz
Stackblitzで開くためには、以下コードを定義
```
<a href="https://stackblitz.com/github/___YOUR_PATH___">
  <img
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
    alt="Open in StackBlitz"
  />
</a>

本記事のGitHubを開くリンクが以下
<a href="https://stackblitz.com/github/jun-knd/material.angular.github/tree/tree">
  <img
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
    alt="Open in StackBlitz"
  />
</a>

```

実際のリンクがこちら  
<a href="https://stackblitz.com/github/jun-knd/material.angular.github/tree/tree">
  <img
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
    alt="Open in StackBlitz"
  />
</a>

## 👇GitHub
https://stackblitz.com/github/jun-knd/material.angular.github/tree/tree

## 👇参考

https://developer.stackblitz.com/docs/guide/open-from-github
