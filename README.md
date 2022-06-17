# Angular Material 導入

## Node.js インストール

[参考]  
https://angular.io/guide/setup-local  
https://nodejs.org/en/download/  

![image](https://user-images.githubusercontent.com/38905609/174221507-415108dd-d73a-497a-aef4-ebc27dd99e27.png)
![image](https://user-images.githubusercontent.com/38905609/174221619-1cf64e4b-97d4-4d72-99e5-0dcee2c20a60.png)
![image](https://user-images.githubusercontent.com/38905609/174221710-44a8fa1b-a414-49f7-a24e-23d0510aa527.png)


## Angular インストール
Angular 14 の導入  
過去バージョンがセットアップされている場合は先にアンインストールする。  
`ng version`  
`npm uninstall -g @angular/cli`  
```
npm install -g @angular/cli@14
ng version
```

## Angular Project 作成
[参考]  
https://angular.io/guide/setup-local
```
ng new datepicker.angular14
```

## Angular Material 導入
[参考]  
https://v13.material.angular.io/guide/getting-started
```
ng add @angular/material

? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? Yes  
? Include the Angular animations module? Include and enable animations
```
