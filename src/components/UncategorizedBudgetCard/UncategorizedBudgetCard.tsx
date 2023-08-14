import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "../BudgetCard";

interface UncategorizedBudgetCardProps {
    onViewExpenseClick: () => void;
    onAddExpenseClick: () => void;
}

function UncategorizedBudgetCard({onViewExpenseClick, onAddExpenseClick} : UncategorizedBudgetCardProps) {

    const { getBudgetExpenses } = useBudgets();

    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((acc, expense) => acc + expense.amount, 0);

    if (amount === 0) {
        return null;
    }

    return <BudgetCard amount={amount} name='Uncategorized' onViewExpenseClick={onViewExpenseClick} onAddExpenseClick={onAddExpenseClick} gray></BudgetCard>
}

export default UncategorizedBudgetCard;