// //import { Type } from 'class-transformer';
// import { IsArray, IsNumber, ValidateNested } from 'class-validator';

// class Pagination<T> {
//   @IsNumber()
//   count: number;

//   @IsNumber()
//   perPage: number;

//   @IsNumber()
//   currentPage: number;

//   @IsArray()
//   @ValidateNested({ each: true })
//   items: T[];

//   constructor(count: number, perPage: number, currentPage: number, items: T[]) {
//     this.count = count;
//     this.perPage = perPage;
//     this.currentPage = currentPage;
//     this.items = items;
//   }
// }

// export default Pagination;

