using {
    cuid,
    managed
} from '@sap/cds/common';

namespace tutorial.db;

// 书实体
entity Books : cuid, managed {
    title    : String;
    author   : Association to Authors; // 一对一关系，一本书一个作者
    Chapters : Composition of many Chapters
                   on Chapters.book = $self; // 一本书拥有多个章节
}

// 作者实体
entity Authors : cuid, managed {
    name  : String;
    books : Association to many Books
                on books.author = $self; // 一对多关系，一个作者拥有多本书
}


// 书籍的章节实体
entity Chapters : cuid, managed {
        number : Integer;
    key book   : Association to Books; // 章节拥有书实体主键，父子关系实体
    // test
}
