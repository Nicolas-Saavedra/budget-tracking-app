import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "../BudgetCard";

function TotalBudgetCard() {

    const { expenses, budgets, getBudgetExpenses } = useBudgets();
    const amount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const max = budgets.reduce((acc, budget) => acc + budget.max, 0) + 
    getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((acc, expense) => acc + expense.amount, 0);

    if (max === 0) {
        return null;
    }

    return <BudgetCard amount={amount} name='Total' max={max} hideButtons gray></BudgetCard>
}

export default TotalBudgetCard;