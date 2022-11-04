import { NextFunction, Request, Response } from 'express';
import { IPage } from '../../models/Ipage';

export const verifyPagination = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { pageNumber, pageSize } = req.query;
  if (isNaN(Number(pageNumber))) {
    pageNumber = String(1);
  }
  if (isNaN(Number(pageSize))) {
    pageSize = String(5);
  }
  if (Number(pageNumber) <= 0) {
    pageNumber = String(1);
  }
  if (Number(pageSize) <= 0) {
    pageSize = String(5);
  }
  const page: IPage = {
    pageNumber: (Number(pageNumber) - 1) * Number(pageSize),
    pageSize: Number(pageSize),
  };
  req.query.pageNumber = String(page.pageNumber);
  req.query.pageSize = String(page.pageSize);
  next();
};
