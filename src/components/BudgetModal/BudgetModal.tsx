import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../../contexts/BudgetsContext";
import { v4 as uuid } from "uuid";

interface BudgetModalProps {
    show: boolean;
    handleClose: () => void;
}

function BudgetModal({ show, handleClose }: BudgetModalProps) {

    const nameRef = useRef<HTMLInputElement>(null)
    const maxSpendingRef = useRef<HTMLInputElement>(null)
    const { addBudget } = useBudgets();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBudget({
            id: uuid(),
            name: nameRef.current!.value,
            max: parseFloat(maxSpendingRef.current!.value),
        });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required placeholder="Enter name" />
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control ref={maxSpendingRef} type="number" required placeholder="Enter maximum spending" min={0} step={.01} />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

export default BudgetModal;