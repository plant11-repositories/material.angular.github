# Angular Material 導入

## Node.js インストール
https://angular.io/guide/setup-local  
https://nodejs.org/en/download/  
![image](https://user-images.githubusercontent.com/38905609/174221507-415108dd-d73a-497a-aef4-ebc27dd99e27.png)
![image](https://user-images.githubusercontent.com/38905609/174221619-1cf64e4b-97d4-4d72-99e5-0dcee2c20a60.png)


## Angular インストール
https://angular.io/guide/setup-local  
過去バージョンがセットアップされている場合は先にアンインストールする。  
`ng version`  
`npm uninstall -g @angular/cli`  
```
npm install -g @angular/cli@14
ng version
```

## Angular Project 作成
https://angular.io/guide/setup-local
```
ng new material.angular.github
```

## Angular Material 導入
https://material.angular.io/guide/getting-started
```
ng add @angular/material

? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? Yes  
? Include the Angular animations module? Include and enable animations
```

