import React, { useContext } from 'react'
import { Budget, Expense } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface BudgetsContextType {
    budgets: Budget[]
    expenses: Expense[]
    getBudgetExpenses: (id: string) => Expense[]
    addExpense: (expense: Expense) => void
    addBudget: (budget: Budget) => void
    deleteBudget: (id: string) => void
    deleteExpense: (id: string) => void
}

const BudgetsContext = React.createContext({} as BudgetsContextType)

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBudgets() {
    return useContext(BudgetsContext)
}

export function BudgetsProvider({ children }: {children: any}) {

    const [budgets, setBudgets] = useLocalStorage<Budget[]>('budgets', [])
    const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', [])
    
    function getBudgetExpenses(id: string) {
        return expenses.filter((expense: Expense) => expense.budgetId === id)
    }

    function addExpense(expense: Expense) {
        setExpenses([...expenses, expense])
    }

    function addBudget(budget: Budget) {
        setBudgets([...budgets, budget])
    }

    function deleteBudget(id: string) {
        setExpenses(expenses.map((expense: Expense) => {
            if (expense.budgetId === id) {
                expense.budgetId = UNCATEGORIZED_BUDGET_ID
            }
            return expense
        }))
        setBudgets(budgets.filter((budget: Budget) => budget.id !== id))
    }

    function deleteExpense(id: string) {
        setExpenses(expenses.filter((expense: Expense) => expense.id !== id))
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>{children}</BudgetsContext.Provider>
    )
}