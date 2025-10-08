import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { Iexpense } from './expense.interface';
import { Expense } from './expense.model';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../../shared/unlinkFile';
import { convertToDate } from './expense.utils';

const createExpense = async (payload: Iexpense): Promise<Iexpense> => {
     const formattedDate = convertToDate(payload.spendingDate as unknown as string);
     payload.spendingDate = formattedDate;
     const result = await Expense.create(payload);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Expense not found.');
     }
     return result;
};

const getAllExpenses = async (query: Record<string, any>): Promise<{ meta: { total: number; page: number; limit: number }; result: Iexpense[] }> => {
     const queryBuilder = new QueryBuilder(Expense.find(), query);
     const result = await queryBuilder.filter().search(['item','description']).sort().paginate().fields().modelQuery;
     const meta = await queryBuilder.countTotal();
     return { meta, result };
};

const getAllUnpaginatedExpenses = async (): Promise<Iexpense[]> => {
     const result = await Expense.find();
     return result;
};

const updateExpense = async (id: string, payload: Partial<Iexpense>): Promise<Iexpense | null> => {
     const isExist = await Expense.findById(id);
     if (!isExist) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Expense not found.');
     }

     return await Expense.findByIdAndUpdate(id, payload, { new: true });
};

const deleteExpense = async (id: string): Promise<Iexpense | null> => {
     const result = await Expense.findById(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Expense not found.');
     }
     result.isDeleted = true;
     result.deletedAt = new Date();
     await result.save();
     return result;
};

const hardDeleteExpense = async (id: string): Promise<Iexpense | null> => {
     const result = await Expense.findByIdAndDelete(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Expense not found.');
     }
     return result;
};

const getExpenseById = async (id: string): Promise<Iexpense | null> => {
     const result = await Expense.findById(id);
     return result;
};

export const expenseService = {
     createExpense,
     getAllExpenses,
     getAllUnpaginatedExpenses,
     updateExpense,
     deleteExpense,
     hardDeleteExpense,
     getExpenseById,
};
