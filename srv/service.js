import { Books } from "#cds-models/BookstoreService"
import { Genreem } from "#cds-models/tutorial/db"
import { UPDATE } from "@sap/cds/lib/ql/cds-ql.js"

export class BookstoreService extends cds.ApplicationService {
  init() {

    // 值帮助更新
    this.on('changeStatus', Books, async (req) => {
      console.log('changeStatus called')
      // 可以获取参数
      const bookId = req.params[0].ID
      const newStatus = req.data.newStatus
      await UPDATE(Books).set({ status_code: newStatus }).where({ ID: bookId })

    })

    // 处理带有参数的函数
    this.on('changePublishDate', Books, async (req) => {
      console.log('ChangePublishDate called')
      // 可以获取参数
      const bookId = req.params[0].ID
      const newDate = req.data.newDate
      console.log(newDate)
      await UPDATE(Books).set({ publishedAt: newDate }).where({ ID: bookId })

    })

    // 添加库存处理
    this.on('addStock', Books, async (req) => {
      console.log('AddStock called')
      // 可以获取参数
      const bookId = req.params[0].ID
      console.log(bookId)
      await UPDATE(Books).set({ stock: { '+=': 1 } }).where({ ID: bookId })
    })

    this.before('READ', Books, async (req) => {
      console.log('Before READ Books')
    })
    this.on('READ', Books, async (req, next) => {
      console.log('on evect')
      return next()
    })
    this.after('READ', Books, async (books, req) => {
      console.log(books)

      for (const book of books) {
        if (book.genre_code === Genreem.Art) {
          book.price = book.price * 0.8
          book.title = '今日折扣商品Genres-7540776'
        }
      }

      console.log('After READ Books')
    })


    // -------------------------------保留以下自动生成部分
    // const { Books, Authors, GenresVH, BookStatus, Chapters } = cds.entities('BookstoreService')

    // this.before (['CREATE', 'UPDATE'], Books, async (req) => {
    //   console.log('Before CREATE/UPDATE Books', req.data)
    // })
    // this.after ('READ', Books, async (books, req) => {
    //   console.log('After READ Books', books)
    // })
    // this.before (['CREATE', 'UPDATE'], Authors, async (req) => {
    //   console.log('Before CREATE/UPDATE Authors', req.data)
    // })
    // this.after ('READ', Authors, async (authors, req) => {
    //   console.log('After READ Authors', authors)
    // })
    // this.before (['CREATE', 'UPDATE'], GenresVH, async (req) => {
    //   console.log('Before CREATE/UPDATE GenresVH', req.data)
    // })
    // this.after ('READ', GenresVH, async (genresVH, req) => {
    //   console.log('After READ GenresVH', genresVH)
    // })
    // this.before (['CREATE', 'UPDATE'], BookStatus, async (req) => {
    //   console.log('Before CREATE/UPDATE BookStatus', req.data)
    // })
    // this.after ('READ', BookStatus, async (bookStatus, req) => {
    //   console.log('After READ BookStatus', bookStatus)
    // })
    // this.before (['CREATE', 'UPDATE'], Chapters, async (req) => {
    //   console.log('Before CREATE/UPDATE Chapters', req.data)
    // })
    // this.after ('READ', Chapters, async (chapters, req) => {
    //   console.log('After READ Chapters', chapters)
    // })


    return super.init()
  }
}
