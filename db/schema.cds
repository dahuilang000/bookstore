using {
    cuid,
    managed,
    sap.common.Currencies
} from '@sap/cds/common';

namespace tutorial.db;

// 书实体
entity Books : cuid, managed {
    title    : String;
    author   : Association to Authors;         // 一对一关系，一本书一个作者
   // genre : String;                          // 书类型，一般
    genre : Association to Genres;             // 自定义实现值帮助
    // genre : Genre;                             // 值帮助枚举类型，同时csv数据也要一起修改
    publishedAt : Date;                        // 日期
    pages : Integer;                           // 页数
    price : Decimal(9, 2);                     // 价格
    currency : Association to Currencies;      // 货币
    stock : Integer;                           // 库存
    status : Association to BookStatus;        // 关联状态实体
    Chapters : Composition of many Chapters
                   on Chapters.book = $self;   // 一本书拥有多个章节
}

// 值帮助实体
entity Genres {
    key code : Genreem;
        description : String;
}


// 可以定义值帮助枚举类型
type Genreem : String enum {
    Fiction = 'Fiction';
    Science = 'Science';
    Cooking = 'Cooking';
    Art = 'Art';
}


entity BookStatus{
    key code : BookStatusCode;
        criticality : Integer;                 //  显示状态颜色
        displayText : String;                  //  显示状态文本
}


// 用来根据库存显示状态
type BookStatusCode : String(1) enum {
    Available = 'A';
    Low_Stock = 'L';
    Unavilable = 'U';
}

// 作者实体
entity Authors : cuid, managed {
    name  : String;
    books : Association to many Books
                on books.author = $self; // 一对多关系，一个作者拥有多本书
}

// 书籍的章节实体
entity Chapters : cuid, managed {
    key book   : Association to Books; // 章节拥有书实体主键，父子关系实体
        number : Integer;              // 页码
        title : String;                // 章节标题
        pages : Integer;               // 多少页

}
