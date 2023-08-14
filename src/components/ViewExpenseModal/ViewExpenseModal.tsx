import { Modal, Stack, Button } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";

interface ViewExpenseModalProps {
    budgetId?: string;
    handleClose: () => void;
}

function ViewExpenseModal({ budgetId, handleClose }: ViewExpenseModalProps) {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {
        name: "Uncategorized",
        id: UNCATEGORIZED_BUDGET_ID
    } : budgets.find(b => b.id === budgetId);

    function removeBudget() {
        deleteBudget(budget!.id);
        handleClose();
    }

    return (
        <Modal show={budgetId !== undefined} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <Stack direction="horizontal" gap={2}>
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && budget !== undefined && (
                        <Button variant="outline-danger" className="ms-auto" onClick={removeBudget}>Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {budget !== undefined && getBudgetExpenses(budget.id).map(expense => (
                    <div key={expense.id}>
                        <Stack direction="horizontal" gap={2}>
                            <div>{expense.description}</div>
                            <div className="ms-auto">{expense.amount}</div>
                            <Button variant="outline-danger" onClick={() => deleteExpense(expense.id)}>Delete</Button>
                        </Stack>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    )
}

export default ViewExpenseModal;