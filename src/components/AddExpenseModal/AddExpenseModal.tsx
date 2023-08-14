import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../../contexts/BudgetsContext";
import { v4 as uuid } from "uuid";

interface AddExpenseModalProps {
    show: boolean;
    handleClose: () => void;
    defaultBudgetId: string;
}

function AddExpenseModal({ show, handleClose, defaultBudgetId }: AddExpenseModalProps) {

    const descriptionRef = useRef<HTMLInputElement>(null)
    const amountRef = useRef<HTMLInputElement>(null)
    const budgetIdRef = useRef<HTMLSelectElement>(null)

    const { addExpense, budgets } = useBudgets();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addExpense({
            id: uuid(),
            description: descriptionRef.current!.value,
            amount: parseFloat(amountRef.current!.value),
            budgetId: budgetIdRef.current!.value
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type="number" required placeholder="Enter maximum spending" min={0} step={.01} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Budget</Form.Label>
                        <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
                            <option key={UNCATEGORIZED_BUDGET_ID} value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget => <option key={budget.id} value={budget.id}>{budget.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal;