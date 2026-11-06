using { tutorial.db as db } from '../db/schema';

service BookstoreService {
    entity Books as projection on db.Books actions {
        action addStock();
    };
    entity Authors as projection on db.Authors;
    entity Chapters as projection on db.Chapters;
    entity BookStatus as projection on db.BookStatus;
    entity GenresVH as projection on db.Genres;
}

// 启用草稿功能
annotate BookstoreService.Books With @odata.draft.enabled;
